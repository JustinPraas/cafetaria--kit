import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { getFriendlyLocaleString, getPriceString } from 'src/app/utils';
import { PayOrderModalComponent } from '../pay-order-modal/pay-order-modal.component';
import { getTotalOrderPrice } from '../utils';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    @HostBinding('class.card') card: boolean = true;
    @HostBinding('class.my-3') my3: boolean = true;
    @HostBinding('class.shadow') shadow: boolean = true;

    @Input()
    orderFullDto: OrderFullDto | null = null;

    @Input()
    payOrderModal?: PayOrderModalComponent;


    constructor(private productService: ProductService) {}

    ngOnInit(): void {}


    getProductById(productId: number) {
        return this.productService.getProductById(productId);
    }

    getProductName(productId: number) {
        const product = this.getProductById(productId);
        return product ? product.name : '???';
    }

    getPriceStringAdaption(adaption: AdaptionShortDto) {
        return getPriceString(adaption.price, "FIXED");
    }

    getTotalOrderPrice() {
        if (this.orderFullDto) {
            return getTotalOrderPrice(this.orderFullDto.productOrderShortDtos);
        } else {
            return -1;
        }
    }

    getParsedDateAndTime(dateAndTime: Date) {
        return getFriendlyLocaleString(dateAndTime);
    }

    openPayOrderModal() {
        this.payOrderModal?.setOrder(this.orderFullDto!);
        //@ts-ignore
        jQuery('#pay-order-modal').modal('show');
    }
}
