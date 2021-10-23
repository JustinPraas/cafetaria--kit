import { Component, Input, OnInit } from '@angular/core';
import { AdaptionService } from 'src/app/services/adaption.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-enable-adaptions-modal-reversed',
    templateUrl: './enable-adaptions-modal-reversed.component.html',
    styleUrls: ['./enable-adaptions-modal-reversed.component.scss'],
})
export class EnableAdaptionsModalReversedComponent implements OnInit {
    selectedPossibleProductIds: number[] = [];

    forAdaption: AdaptionFullDto | null = null;

    constructor(private productService: ProductService, private adaptionService: AdaptionService) {}

    ngOnInit(): void {}

    setForAdaption(adaption: AdaptionFullDto) {
        this.forAdaption = adaption;
        this.selectedPossibleProductIds = adaption.linkedProductShortDtos.map(p => p.id);
    }

    closeModal() {
        //@ts-ignore
        jQuery('#enable-adaptions-modal-reversed').modal('hide');
    }

    getProductFullDtos() {
        return this.productService.getAllProductFullDtos();
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
            this.adaptionService.linkProductsToAdaption(this.forAdaption.id!, this.selectedPossibleProductIds, this.closeModal.bind(this))
        }
    }
}
