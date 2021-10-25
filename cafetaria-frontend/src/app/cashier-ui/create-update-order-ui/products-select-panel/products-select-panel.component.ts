import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { getPriceString, hexToRGB, sequenceOrder } from 'src/app/utils';

@Component({
    selector: 'app-products-select-panel',
    templateUrl: './products-select-panel.component.html',
    styleUrls: ['./products-select-panel.component.scss'],
})
export class ProductsSelectPanelComponent implements OnInit {
    @HostBinding('class.content') classContent: boolean = true;
    @HostBinding('class.products-wrapper') classLeftPanelWrapper: boolean =
        true;
    @HostBinding('class.bg-light') classBgLight: boolean = true;

    @Input()
    selectedCategory: CategoryShortDto | null = null;

    @Input()
    selectedProduct: ProductFullDto | null = null;

    @Output()
    onProductClickedEvent = new EventEmitter<ProductFullDto>();

    @Output()
    onAdaptionClickedEvent = new EventEmitter<{
        adaption: AdaptionShortDto;
        add: boolean;
    }>();

    isAdd: boolean = true;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {}

    getProductById(productId: number) {
        return this.dataService
            .getProductFullDtos()
            .find((p) => p.id == productId);
    }

    getCategoryById(categoryId: number) {
        return this.dataService
            .getCategoryShortDtos()
            .find((c) => c.id == categoryId);
    }

    getColor(categoryId: number, alpha?: number) {
        const category = this.getCategoryById(categoryId);
        if (!category) {
            return hexToRGB('#cccccc', alpha ? alpha : 1);
        } else {
            return hexToRGB(category.colorHex, alpha ? alpha : 1);
        }
    }

    getPriceStringProduct(product: ProductShortDto) {
        return getPriceString(product.price, product.priceType);
    }

    getPriceStringAdaption(adaption: AdaptionShortDto) {
        return getPriceString(adaption.price, 'FIXED');
    }

    getProductsFromSelectedCategory() {
        if (this.selectedCategory) {
            return this.dataService
                .getProductFullDtos()
                .filter(
                    (p) => p.categoryId == this.selectedCategory!.id && p.active
                )
                .sort(sequenceOrder);
        } else {
            const result: ProductFullDto[] = [];

            this.dataService
                .getCategoryShortDtos()
                .sort(sequenceOrder)
                .forEach((c) => {
                    let productsUnsorted: ProductFullDto[] = [];
                    c.productIds.forEach((pid) => {
                        const product = this.getProductById(pid);
                        if (product) productsUnsorted.push(product);
                    });
                    result.push(...productsUnsorted.sort(sequenceOrder));
                });

            return result;
        }
    }

    getAdaptionsFromSelectedProductSorted() {
        const adaptionRanks = this.dataService.getAdaptionRanks();
        if (this.selectedProduct) {
            return this.selectedProduct.possibleAdaptionShortDtos.sort((a, b) => adaptionRanks[b.id!] - adaptionRanks[a.id!]);
        } else {
            return [];
        }
    }

    setIsAdd(isAdd: boolean) {
        this.isAdd = isAdd;
    }

    onProductClick(product: ProductFullDto) {
        this.onProductClickedEvent.emit(product);
    }

    onAdaptionClick(adaption: AdaptionShortDto) {
        this.onAdaptionClickedEvent.emit({ adaption, add: this.isAdd });
    }
}
