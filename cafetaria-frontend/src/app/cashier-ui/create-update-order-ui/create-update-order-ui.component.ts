import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { delay, filter, retryWhen, take } from 'rxjs/operators';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { getPriceString, hexToRGB, sequenceOrder } from 'src/app/utils';
import { ApplyAdaptionsModalComponent } from './apply-adaptions-modal/apply-adaptions-modal.component';
import {
    createOrderCreateDtoFromOrderFullDto,
    getTotalOrderPrice,
    isProductOrderCreateUpdateEqual,
} from './utils';

@Component({
    selector: 'app-create-update-order-ui',
    templateUrl: './create-update-order-ui.component.html',
    styleUrls: ['./create-update-order-ui.component.scss'],
})
export class CreateUpdateOrderUiComponent implements OnInit {
    @ViewChild(ApplyAdaptionsModalComponent) applyAdaptionsModal:
        | ApplyAdaptionsModalComponent
        | undefined;

    @ViewChild(ConfirmationModalComponent) confirmationModal:
        | ConfirmationModalComponent
        | undefined;

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return !this.changes
    }

    changes: boolean = false;

    selectedCategory: CategoryFullDto | null = null;

    orderCreateDto: OrderCreateUpdateDto = {
        customerName: '',
        productOrderCreateUpdateDtos: [],
        paymentType: 'UNKNOWN',
    };

    orderFullDtoToEdit?: OrderFullDto;

    productIdForSetPrice: number | null = null;

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.categoryService.fetchCategoryFullDtos();
        this.checkForEditOrder();

        this.router.events
            .pipe(
                filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd)
            )
            .subscribe((event) => {
                if (event.id === 1 && event.url === event.urlAfterRedirects) {
                    console.log('attempting to refresh');
                }
            });
    }

    checkForEditOrder() {
        this.activatedRoute.params.subscribe((params) => {
            if (params.id) {
                this.orderService
                    .getOrderFullDtoById(params.id)
                    .pipe(
                        retryWhen((errors) => errors.pipe(delay(250), take(5)))
                    )
                    .subscribe((orderFullDto) => {
                        if (orderFullDto) {
                            this.orderFullDtoToEdit = orderFullDto;
                            this.orderCreateDto =
                                createOrderCreateDtoFromOrderFullDto(
                                    this.orderFullDtoToEdit
                                );
                        }
                    });
            }
        });
    }

    getColor(category: CategoryFullDto | null, alpha?: number) {
        if (!category) {
            return hexToRGB('#cccccc', alpha ? alpha : 1);
        } else {
            return hexToRGB(category.colorHex, alpha ? alpha : 1);
        }
    }

    getCategoryById(categoryId: number) {
        return this.getCategories().filter((c) => c.id === categoryId)[0];
    }

    getCategories() {
        return this.categoryService
            .getCategoryFullDtos()
            .filter((c) => !c.archived && c.active)
            .sort(sequenceOrder);
    }

    getProductById(productId: number) {
        return this.productService.getProductById(productId);
    }

    getProductName(productId: number) {
        const product = this.getProductById(productId);
        return product ? product.name : '???';
    }

    getProductsFromSelectedCategory() {
        if (this.selectedCategory) {
            return this.selectedCategory.productShortDtos.filter(
                (p) => !p.archived && p.active
            ).sort(sequenceOrder);
        } else {
            return ([] as ProductShortDto[])
                .concat(...this.getCategories().sort(sequenceOrder).map((c) => c.productShortDtos))
                .filter((p) => !p.archived && p.active);
        }
    }

    getPriceString(pocud: ProductOrderCreateUpdateDto) {
        const product = this.getProductById(pocud.productId);
        if (product) {
            return getPriceString(pocud.price, product.priceType);
        } else {
            return '???';
        }
    }

    getPriceStringAdaption(adaption: AdaptionShortDto) {
        return getPriceString(adaption.price, 'FIXED');
    }

    getPriceStringProduct(product: ProductShortDto) {
        return getPriceString(product.price, product.priceType);
    }

    getTotalOrderPrice() {
        return getTotalOrderPrice(
            this.orderCreateDto.productOrderCreateUpdateDtos
        );
    }

    setSelectedCategory(category: CategoryFullDto | null) {
        this.selectedCategory = category;
    }

    openSetPriceModal(productId: number) {
        this.productIdForSetPrice = productId;
        //@ts-ignore
        jQuery('#set-price-modal').modal('show');
    }

    addProductOrder(productOrder: ProductOrderCreateUpdateDto) {
        // Find existing product order that matches this one
        const match = this.orderCreateDto.productOrderCreateUpdateDtos.find(
            (pocud) => isProductOrderCreateUpdateEqual(pocud, productOrder)
        );
        if (match) {
            match.quantity++;
        } else {
            this.orderCreateDto.productOrderCreateUpdateDtos.push(productOrder);
        }
        this.changes = true;
    }

    decreaseProductOrder(productOrder: ProductOrderCreateUpdateDto) {
        const match = this.orderCreateDto.productOrderCreateUpdateDtos.find(
            (pocud) => isProductOrderCreateUpdateEqual(pocud, productOrder)
        );
        if (match) {
            if (--match.quantity == 0) {
                // splice product order
                const index =
                    this.orderCreateDto.productOrderCreateUpdateDtos.findIndex(
                        (pocud) =>
                            isProductOrderCreateUpdateEqual(pocud, productOrder)
                    );
                this.orderCreateDto.productOrderCreateUpdateDtos.splice(
                    index,
                    1
                );
            }
        }
        this.changes = true;
    }

    removeProductOrderAll(productOrder: ProductOrderCreateUpdateDto) {
        this.orderCreateDto.productOrderCreateUpdateDtos =
            this.orderCreateDto.productOrderCreateUpdateDtos.filter(
                (pocud) => !isProductOrderCreateUpdateEqual(productOrder, pocud)
            );
        this.changes = true;
    }

    confirmOrder() {
        this.changes = false;
        //@ts-ignore
        jQuery('#confirm-order-modal').modal('show');
    }

    cancelOrder() {
        this.orderCreateDto = {
            customerName: '',
            productOrderCreateUpdateDtos: [],
            paymentType: 'UNKNOWN',
        };
    }

    getOnClickInvoke(host: any, product: ProductShortDto) {
        return product.price == ''
            ? function () {
                  host.openSetPriceModal(product.id);
              }
            : function () {
                  host.addProductOrder({
                      id: 0,
                      productId: product.id,
                      price: product.price,
                      appliedAdaptionShortDtos: [],
                      quantity: 1,
                  });
              };
    }

    addProductWithAdaption(
        product: ProductShortDto,
        appliedAdaptionShortDtos: AdaptionShortDto[]
    ) {
        this.addProductOrder({
            id: 0,
            productId: product.id,
            price: product.price,
            appliedAdaptionShortDtos: appliedAdaptionShortDtos,
            quantity: 1,
        });
        this.changes = true;
    }

    getOnHoldInvoke(
        host: any,
        product: ProductShortDto,
        onApplyCallback: (
            product: ProductFullDto,
            appliedAdaptionShortDtos: AdaptionShortDto[]
        ) => void
    ) {
        if (product.priceType != 'VARIABLE') {
            return function () {
                host.applyAdaptionsModal!.forProduct = product;
                host.applyAdaptionsModal!.selectedAdaptionShortDtos = [];
                host.applyAdaptionsModal!.onApplyAdaptionShortDtos =
                    onApplyCallback;
                //@ts-ignore
                jQuery('#apply-adaptions-modal').modal('show');
            };
        } else {
            return function () {
                return host.toastr.info(
                    'Voer eerst een prijs in',
                    'Dit kan nu niet'
                );
            };
        }
    }

    getOnHoldProductOrderInvoke(
        host: any,
        product: ProductFullDto,
        productOrderCreateUpdateDto: ProductOrderCreateUpdateDto,
        onApplyCallback: (
            product: ProductFullDto,
            appliedAdaptionShortDtos: AdaptionShortDto[],
            productOrderCreateUpdateDto: ProductOrderCreateUpdateDto
        ) => void
    ) {
        return function () {
            host.applyAdaptionsModal!.forProduct = product;
            host.applyAdaptionsModal!.selectedAdaptionShortDtos =
                productOrderCreateUpdateDto.appliedAdaptionShortDtos;
            host.applyAdaptionsModal!.forProductOrderCreateUpdateDto =
                productOrderCreateUpdateDto;
            host.applyAdaptionsModal!.onApplyAdaptionShortDtos =
                onApplyCallback;

            //@ts-ignore
            jQuery('#apply-adaptions-modal').modal('show');
        };
    }

    updateProductWithAdaptionShortDtos(
        product: ProductFullDto,
        appliedAdaptionShortDtos: AdaptionShortDto[],
        productOrderCreateUpdateDto: ProductOrderCreateUpdateDto
    ) {
        productOrderCreateUpdateDto.appliedAdaptionShortDtos =
            appliedAdaptionShortDtos;
        this.changes = true;
    }

    onCancelOrderAttempt() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    // showCancelOrderConfirmationModal() {
    //     if (this.changes) {
    //         this.confirmationModal?.setMessage(
    //             'Weet je zeker dat je het aanmaken van de bestelling wilt annuleren?'
    //         );
    //         this.confirmationModal?.setOnConfirmation(() => {
    //             this.cancelOrder.bind(this);
    //             this.router.navigate(['../'], { relativeTo: this.route });
    //             this.confirmationModal?.closeModal();
    //         });
    //         this.confirmationModal?.showModal();
    //     } else {
    //         this.cancelOrder.bind(this);
    //         this.router.navigate(['../'], { relativeTo: this.route });
    //     }
    // }
}
