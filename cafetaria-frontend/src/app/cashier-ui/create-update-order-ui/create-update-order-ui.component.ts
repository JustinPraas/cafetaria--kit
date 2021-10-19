import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Big from 'big.js';
import { delay, retry, retryWhen, take } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { getPriceString, hexToRGB } from 'src/app/utils';
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
        private orderService: OrderService
    ) {}

    ngOnInit(): void {
        this.categoryService.fetchCategoryFullDtos();
        this.checkForEditOrder();
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
            .filter((c) => !c.archived && c.active);
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
            );
        } else {
            return ([] as ProductShortDto[])
                .concat(...this.getCategories().map((c) => c.productShortDtos))
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

    getPriceStringProduct(product: ProductShortDto) {
        return getPriceString(product.price, product.priceType)
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
    }

    removeProductOrderAll(productOrder: ProductOrderCreateUpdateDto) {
        this.orderCreateDto.productOrderCreateUpdateDtos =
            this.orderCreateDto.productOrderCreateUpdateDtos.filter(
                (pocud) => !isProductOrderCreateUpdateEqual(productOrder, pocud)
            );
    }

    confirmOrder() {
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
}
