import { Component, OnInit } from '@angular/core';
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
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.orderService.fetchAllOrderFullDtos();
        this.categoryService.fetchCategoryFullDtos();
        this.adaptionService.fetchAdaptions();
        this.productService.fetchProductFullDtos();
    }
}
