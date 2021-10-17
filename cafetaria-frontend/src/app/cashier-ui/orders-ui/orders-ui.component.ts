import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { DataService } from 'src/app/data.service';
import { OrderService } from 'src/app/order.service';

@Component({
    selector: 'app-orders-ui',
    templateUrl: './orders-ui.component.html',
    styleUrls: ['./orders-ui.component.scss'],
})
export class OrdersUiComponent implements OnInit {
    constructor(
        private orderService: OrderService,
        private categoryService: CategoryService,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.orderService.fetchAllOrderFullDtos();
        this.categoryService.fetchCategoryFullDtos();
    }

    getOrderFullDtos(): OrderFullDto[] {
        return this.dataService.getOrderFullDtos();
    }
}
