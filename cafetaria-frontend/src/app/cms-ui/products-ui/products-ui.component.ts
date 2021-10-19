import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCreateUpdateModalComponent } from './product-create-update-modal/product-create-update-modal.component';
import { ProductArchiveModalComponent } from './product-archive-modal/product-archive-modal.component';
import { getPriceString } from 'src/app/utils';
import { CategoryService } from 'src/app/services/category.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-products-ui',
    templateUrl: './products-ui.component.html',
    styleUrls: ['./products-ui.component.scss'],
})
export class ProductsUiComponent implements OnInit {

    @ViewChild(ProductCreateUpdateModalComponent) productCreateUpdateModal: ProductCreateUpdateModalComponent | undefined;
    @ViewChild(ProductArchiveModalComponent) productArchiveModal: ProductArchiveModalComponent | undefined;

    constructor(private categoryService: CategoryService, private dataService: DataService) {}

    ngOnInit(): void {}

    getPriceString(product: ProductShortDto) {
        return getPriceString(product.price, product.priceType);
    }

    getCategories(): CategoryFullDto[] {
        return this.categoryService.getCategoryFullDtos()
    }

    getNonArchivedProducts(categoryId: number) {
        return this.dataService.getNonArchivedProductShortDtos(categoryId);
    }
}
