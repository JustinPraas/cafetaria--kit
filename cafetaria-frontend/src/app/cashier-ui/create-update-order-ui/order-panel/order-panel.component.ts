import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, retryWhen, delay, take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';
import { getPriceString } from 'src/app/utils';
import {
    createOrderCreateDtoFromOrderFullDto,
    getTotalOrderPrice,
    isProductOrderCreateUpdateEqual,
} from '../utils';

const emptyProductOrderCreateUpdate: ProductOrderCreateUpdateDto = {
    id: -1,
    productId: -1,
    price: '',
    appliedAdaptionShortDtos: [],
    quantity: -1,
};

@Component({
    selector: 'app-order-panel',
    templateUrl: './order-panel.component.html',
    styleUrls: ['./order-panel.component.scss'],
})
export class OrderPanelComponent implements OnInit {
    @Output()
    onAdaptionHoldEvent = new EventEmitter<ProductOrderCreateUpdateDto>();

    productOrderCreateUpdates: ProductOrderCreateUpdateDto[] = [];
    lastAddedProductOrderCreateUpdate: ProductOrderCreateUpdateDto | null =
        null;

    orderToEdit?: OrderFullDto;

    changes: boolean = false;

    constructor(
        private dataService: DataService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private orderService: OrderService
    ) {}

    /**
     *
     *
     * Initialization of the order panel. Checks whether an order should be edited or created
     *
     *
     */
    ngOnInit(): void {
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
                            this.orderToEdit = orderFullDto;
                            this.productOrderCreateUpdates =
                                createOrderCreateDtoFromOrderFullDto(
                                    this.orderToEdit
                                ).productOrderCreateUpdateDtos;
                        }
                    });
            }
        });
    }

    /**
     *
     *
     * Order manipulation functions
     *
     *
     */

    addProductOrder(productOrder: ProductOrderCreateUpdateDto) {
        this.productOrderCreateUpdates.push(productOrder);
        this.lastAddedProductOrderCreateUpdate = productOrder;
        this.changes = true;
    }

    increaseProductOrderQuantity(productOrder: ProductOrderCreateUpdateDto) {
        productOrder.quantity++;
        this.changes = true;
    }

    decreaseProductOrderQuantity(productOrder: ProductOrderCreateUpdateDto) {
        if (--productOrder.quantity == 0) {
            // splice product order
            const index = this.productOrderCreateUpdates.findIndex((pocud) =>
                isProductOrderCreateUpdateEqual(pocud, productOrder)
            );
            this.productOrderCreateUpdates.splice(index, 1);
        }
        this.changes = true;
    }

    removeProductOrderAll(productOrder: ProductOrderCreateUpdateDto) {
        this.productOrderCreateUpdates = this.productOrderCreateUpdates.filter(
            (pocud) => !isProductOrderCreateUpdateEqual(productOrder, pocud)
        );
        this.changes = true;
    }

    onProductNameHoldEventInvoke(
        productOrderCreateUpdateDto: ProductOrderCreateUpdateDto
    ) {
        this.onAdaptionHoldEvent.emit(productOrderCreateUpdateDto);
    }

    updateProductWithAdaptionShortDtos(
        appliedAdaptionShortDtos: AdaptionShortDto[],
        productOrderCreateUpdateDto?: ProductOrderCreateUpdateDto
    ) {
        if (productOrderCreateUpdateDto) {
            productOrderCreateUpdateDto.appliedAdaptionShortDtos =
                appliedAdaptionShortDtos;
            this.changes = true;
        } else {
            console.log('Het product kon helaas niet geüpdate worden');
        }
    }

    getProductById(productId: number) {
        return this.dataService
            .getProductFullDtos()
            .find((p) => p.id == productId);
    }

    getProductName(productId: number) {
        const product = this.getProductById(productId);
        return product ? product.name : '???';
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
        return getTotalOrderPrice(this.productOrderCreateUpdates);
    }

    getProductOrders() {
        return this.productOrderCreateUpdates;
    }

    getOrderCreateUpdateDto(): OrderCreateUpdateDto {
        const productOrderCreateUpdateDtos = this.productOrderCreateUpdates;
        // if (this.currentProductOrderCreateUpdate) productOrderCreateUpdateDtos.push(this.currentProductOrderCreateUpdate);
        return {
            customerName: '',
            productOrderCreateUpdateDtos: productOrderCreateUpdateDtos,
            paymentType: 'UNKNOWN',
        };
    }

    canConfirm() {
        return this.productOrderCreateUpdates.length > 0;
    }

    confirmOrder() {
        this.changes = false;
        //@ts-ignore
        jQuery('#confirm-order-modal').modal('show');
    }

    cancelOrder() {
        this.productOrderCreateUpdates = [];
    }

    onCancelOrderAttempt() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
}
