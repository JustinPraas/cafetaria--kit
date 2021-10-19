import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { getTotalOrderPrice } from '../utils';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    host : {
        '[style.height]' : "'100%'",
        '[style.display]' : 'block'
    }
})
export class OrderComponent implements OnInit {
    @Input()
    orderFullDto: OrderFullDto | null = null;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {}


    getProductById(productId: number) {
        return this.productService.getProductById(productId);
    }

    getProductName(productId: number) {
        const product = this.getProductById(productId);
        return product ? product.name : '???';
    }

    getTotalOrderPrice() {
        if (this.orderFullDto) {
            return getTotalOrderPrice(this.orderFullDto.productOrderShortDtos);
        } else {
            return -1;
        }
    }

    getParsedDateAndTime(dateAndTime: Date) {
        const parsedDateAndTime = new Date(Date.parse(dateAndTime.toString()));
        return parsedDateAndTime.toLocaleString("nl-NL")
    }
}
