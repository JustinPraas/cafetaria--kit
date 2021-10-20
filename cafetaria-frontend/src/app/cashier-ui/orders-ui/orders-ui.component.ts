import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CategoryService } from 'src/app/services/category.service';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';

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

    getSortedOrderFullDtos(): OrderFullDto[] {
        return this.orderService.getNonPaidOrders().sort((b, a) => {
            return (
                (a.modifiedOn
                    ? moment(a.modifiedOn).valueOf()
                    : moment(a.createdOn).valueOf()) -
                (b.modifiedOn
                    ? moment(b.modifiedOn).valueOf()
                    : moment(b.createdOn).valueOf())
            );
        });
    }
}
