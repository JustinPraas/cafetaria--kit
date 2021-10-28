import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ORGANIZATION } from '../constants';
import { AdaptionService } from '../services/adaption.service';
import { CategoryService } from '../services/category.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-cashier-ui',
    templateUrl: './cashier-ui.component.html',
    styleUrls: ['./cashier-ui.component.scss'],
})
export class CashierUiComponent implements OnInit {
    constructor(
        private orderService: OrderService,
        private categoryService: CategoryService,
        private adaptionService: AdaptionService,
        private productService: ProductService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.orderService.fetchAllOrderFullDtos();
        this.categoryService.fetchCategoryShortDtos();
        this.adaptionService.fetchAdaptions();
        this.adaptionService.fetchAdaptionRanks();
        this.productService.fetchProductFullDtos();
        this.titleService.setTitle(`${ORGANIZATION} - Kassa`)
    }
}
