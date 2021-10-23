import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-pay-order-modal',
    templateUrl: './pay-order-modal.component.html',
    styleUrls: ['./pay-order-modal.component.scss'],
})
export class PayOrderModalComponent implements OnInit {

    order: OrderFullDto | null = null;

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {}

    setOrder(orda: OrderFullDto) {
        this.order = orda;
    }

    payOrder(paymentType: PaymentType) {
        if (this.order)
            this.orderService.payOrder(this.order, paymentType, this.closeModal.bind(this));
        else
            console.log("There's no order that can be paid")
    }


    closeModal() {
        //@ts-ignore
        jQuery('#pay-order-modal').modal('hide');
    }
}
