import { Component, Input, OnInit } from '@angular/core';
import { AdaptionService } from 'src/app/services/adaption.service';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-enable-adaptions-modal-reversed',
    templateUrl: './enable-adaptions-modal-reversed.component.html',
    styleUrls: ['./enable-adaptions-modal-reversed.component.scss'],
})
export class EnableAdaptionsModalReversedComponent implements OnInit {
    selectedPossibleProductIds: number[] = [];

    forAdaption: AdaptionFullDto | null = null;

    constructor(
        private productService: ProductService,
        private adaptionService: AdaptionService,
        private dataService: DataService
    ) {}

    ngOnInit(): void {}

    setForAdaption(adaption: AdaptionFullDto) {
        this.forAdaption = adaption;
        this.selectedPossibleProductIds = adaption.linkedProductShortDtos.map(
            (p) => p.id
        );
    }

    closeModal() {
        //@ts-ignore
        jQuery('#enable-adaptions-modal-reversed').modal('hide');
    }

    getCategoryShortDtos() {
        return this.dataService.getCategoryShortDtos();
    }

    getProductFullDtosFromCategory(categoryId: number) {
        return this.dataService
            .getProductFullDtos()
            .filter((p) => p.categoryId === categoryId);
    }

    selectAllInCategory(categoryId: number) {
        const idSet = new Set(this.selectedPossibleProductIds);
        this.getProductFullDtosFromCategory(categoryId).forEach((p) =>
            idSet.add(p.id)
        );

        this.selectedPossibleProductIds = [...idSet];
    }

    deselectAllInCategory(categoryId: number) {
        const productIds = this.getProductFullDtosFromCategory(categoryId).map(p => p.id)
        this.selectedPossibleProductIds = this.selectedPossibleProductIds.filter(id => !productIds.includes(id))
    }

    isCategoryFullySelected(categoryId: number) {
        return this.getProductFullDtosFromCategory(categoryId).every((e) =>
            this.selectedPossibleProductIds.includes(e.id)
        );
    }

    isCategoryFullyUnselected(categoryId: number) {
        return !this.getProductFullDtosFromCategory(categoryId).some((e) =>
            this.selectedPossibleProductIds.includes(e.id)
        );
    }

    isSelected(productId: number) {
        return this.selectedPossibleProductIds.includes(productId);
    }

    deselect(productId: number) {
        this.selectedPossibleProductIds =
            this.selectedPossibleProductIds.filter((id) => id != productId);
    }

    select(productId: number) {
        this.selectedPossibleProductIds.push(productId);
        this.selectedPossibleProductIds = [
            ...new Set(this.selectedPossibleProductIds),
        ];
    }

    setPossibleProductIds() {
        if (this.forAdaption) {
            this.adaptionService.linkProductsToAdaption(
                this.forAdaption.id!,
                this.selectedPossibleProductIds,
                this.closeModal.bind(this)
            );
        }
    }
}
