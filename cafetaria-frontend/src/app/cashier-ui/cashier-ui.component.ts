import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { OrderService } from '../order.service';

@Component({
    selector: 'app-cashier-ui',
    templateUrl: './cashier-ui.component.html',
    styleUrls: ['./cashier-ui.component.scss'],
})
export class CashierUiComponent implements OnInit {
    constructor(
        private orderService: OrderService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.orderService.fetchAllOrderFullDtos();
        this.categoryService.fetchCategoryFullDtos();
    }
}
