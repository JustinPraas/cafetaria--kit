import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { getPriceString } from 'src/app/utils';
import {
    getQuantityOf,
    getTotalOrderPrice,
    getUniqueProductOrderCreateUpdateDtos,
} from '../../utils';

@Component({
    selector: 'app-confirm-order-modal',
    templateUrl: './confirm-order-modal.component.html',
    styleUrls: ['./confirm-order-modal.component.scss'],
})
export class ConfirmOrderModalComponent implements OnInit {
    setCustomerNameFormGroup = new FormGroup({
        customerName: new FormControl(''),
    });

    @Input()
    orderCreateDto: OrderCreateUpdateDto | null = null;

    @Input()
    orderFullDtoToEdit?: OrderFullDto;

    constructor(
        private productService: ProductService,
        private dataService: DataService,
        private orderService: OrderService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        //@ts-ignore
        jQuery('#confirm-order-modal').on('shown.bs.modal', function () {
            //@ts-ignore
            jQuery('#customerName').trigger('focus');
        });
    }

    onSuccess() {
        this.closeModal();
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    closeModal() {
        this.setCustomerNameFormGroup = new FormGroup({
            customerName: new FormControl(''),
        });

        //@ts-ignore
        jQuery('#confirm-order-modal').modal('hide');
    }

    getProductById(productId: number) {
        return this.productService.getProductById(productId);
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
        return getPriceString(adaption.price, "FIXED");
    }

    getQuantityOf(productOrder: ProductOrderCreateUpdateDto) {
        if (this.orderCreateDto) {
            return getQuantityOf(
                productOrder,
                this.orderCreateDto.productOrderCreateUpdateDtos
            );
        } else {
            return -1;
        }
    }

    getUniqueProductOrderCreateUpdateDtos() {
        if (this.orderCreateDto) {
            return getUniqueProductOrderCreateUpdateDtos(
                this.orderCreateDto.productOrderCreateUpdateDtos
            );
        } else {
            return [];
        }
    }

    getTotalOrderPrice() {
        if (this.orderCreateDto) {
            return getTotalOrderPrice(
                this.orderCreateDto.productOrderCreateUpdateDtos
            );
        } else {
            return [];
        }
    }

    onSubmit() {
        if (this.orderCreateDto) {
            this.orderCreateDto.customerName =
                this.setCustomerNameFormGroup.controls.customerName.value;

            if (this.orderFullDtoToEdit) {
                this.orderService.updateOrder(
                    this.orderFullDtoToEdit.id,
                    this.orderCreateDto,
                    this.onSuccess.bind(this)
                );
            } else {
                this.orderService.createOrder(
                    this.orderCreateDto,
                    this.onSuccess.bind(this)
                );
            }
        } else {
            this.toastr.error('Er ging wat fout...');
        }
    }

    isOrderWithSameName() {
        const name = this.setCustomerNameFormGroup.controls.customerName.value
        const orderWithSameName = this.dataService.getOrderFullDtos().find(order => order.paidOn == null && order.customerName.toLocaleLowerCase() == name.toLowerCase())
        return orderWithSameName != null
    }
}
