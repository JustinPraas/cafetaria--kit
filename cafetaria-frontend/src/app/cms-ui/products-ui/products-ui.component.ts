import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCreateUpdateModalComponent } from './product-create-update-modal/product-create-update-modal.component';
import { ProductArchiveModalComponent } from './product-archive-modal/product-archive-modal.component';
import { getPriceString, sequenceOrder } from 'src/app/utils';
import { CategoryService } from 'src/app/services/category.service';
import { DataService } from 'src/app/services/data.service';
import { ReorderModalComponent } from '../reorder-modal/reorder-modal.component';
import { ProductService } from 'src/app/services/product.service';
import { EnableAdaptionsModalComponent } from './enable-adaptions-modal/enable-adaptions-modal.component';
import { AdaptionService } from 'src/app/services/adaption.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-products-ui',
    templateUrl: './products-ui.component.html',
    styleUrls: ['./products-ui.component.scss'],
})
export class ProductsUiComponent implements OnInit {
    @ViewChild(ProductCreateUpdateModalComponent) productCreateUpdateModal:
        | ProductCreateUpdateModalComponent
        | undefined;
    @ViewChild(ProductArchiveModalComponent) productArchiveModal:
        | ProductArchiveModalComponent
        | undefined;
    @ViewChild(ReorderModalComponent) reorderModal:
        | ReorderModalComponent
        | undefined;

    @ViewChild(EnableAdaptionsModalComponent)
    enableAdaptionModal?: EnableAdaptionsModalComponent;

    filteredProductName: string | null = null;
    filteredProducts: ProductFullDto[] = [];

    filteredCategoryId: number | null = null;
    filteredCategories: CategoryShortDto[] = [];

    constructor(
        private categoryService: CategoryService,
        private adaptionService: AdaptionService,
        private dataService: DataService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.productService.fetchProductFullDtos(this.getFilteredCategoriesAndProducts.bind(this));
        this.categoryService.fetchCategoryShortDtos(this.getFilteredCategoriesAndProducts.bind(this));
        this.adaptionService.fetchAdaptions();
    }

    getPriceString(product: ProductFullDto) {
        return getPriceString(product.price, product.priceType);
    }

    getCategoryShortDtosSorted(): CategoryShortDto[] {
        return this.dataService.getCategoryShortDtos().sort(sequenceOrder);
    }

    getProductById(productId: number) {
        return this.dataService
            .getProductFullDtos()
            .find((p) => p.id === productId);
    }

    getProductsInCategorySorted(categoryId: number) {
        return this.dataService
            .getProductFullDtos()
            .filter((p) => categoryId == p.categoryId)
            .filter((p) => this.filteredProducts.map(pr => pr.id).includes(p.id))
            .sort(sequenceOrder);
    }

    openReorderProductsForCategory(categoryId: number) {
        const products = this.getProductsInCategorySorted(categoryId);

        if (products) {
            this.reorderModal?.setElements(products);

            //@ts-ignore
            jQuery('#reorder-modal').modal('show');
        }
    }

    closeReorderModal() {
        //@ts-ignore
        jQuery('#reorder-modal').modal('hide');
    }

    onApplyReorderInvoke(reorderEntitiesDto: ReorderEntitiesDto) {
        this.productService.reorderProducts(
            reorderEntitiesDto,
            this.closeReorderModal.bind(this)
        );
    }

    clearFilters() {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {product: null, categorie: null},
                queryParamsHandling: "merge"
            }
        )
    }

    filtersActive() {
        return this.filteredCategoryId || this.filteredProductName
    }

    setFilterCategory(categoryId: number | null) {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {categorie: categoryId},
                queryParamsHandling: "merge"
            }
        )
    }

    setFilteredProductName(productName: string | null) {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {product: productName == "" ? null : productName},
                queryParamsHandling: "merge"
            }
        )
    }

    getFilteredCategoriesAndProducts() {
        this.route.queryParamMap.subscribe(params => {
            const categoryId = params.get("categorie")
            const productName = params.get("product")

            if (categoryId) {
                this.filteredCategoryId = +categoryId;
                this.filteredCategories = Array.of(this.getCategoryShortDtosSorted().find(c => c.id == +categoryId)!)
            } else {
                this.filteredCategoryId = null;
                this.filteredCategories = this.getCategoryShortDtosSorted();
            }

            if (productName) {
                this.filteredProductName = productName;
                this.filteredProducts = this.dataService.getProductFullDtos().filter(p => p.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase()))
            } else {
                this.filteredProductName = null;
                this.filteredProducts = this.dataService.getProductFullDtos()
            }
        })
    }
}
