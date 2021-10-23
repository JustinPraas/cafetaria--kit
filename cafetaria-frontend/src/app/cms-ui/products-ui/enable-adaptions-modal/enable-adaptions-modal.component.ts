import { Component, Input, OnInit } from '@angular/core';
import { AdaptionService } from 'src/app/services/adaption.service';
import { DataService } from 'src/app/services/data.service';
import { getPriceString } from 'src/app/utils';

@Component({
    selector: 'app-enable-adaptions-modal',
    templateUrl: './enable-adaptions-modal.component.html',
    styleUrls: ['./enable-adaptions-modal.component.scss'],
})
export class EnableAdaptionsModalComponent implements OnInit {
    selectedPossibleAdaptionIds: number[] = [];

    forProduct: ProductFullDto | null = null;

    constructor(private adaptionService: AdaptionService, private dataService: DataService) {}

    ngOnInit(): void {}

    setForProduct(product: ProductFullDto) {
        this.forProduct = product;
        this.selectedPossibleAdaptionIds = product.possibleAdaptionShortDtos.map(p => p.id!);
    }

    closeModal() {
        //@ts-ignore
        jQuery('#enable-adaptions-modal').modal('hide');
    }

    getAdaptionFullDtos() {
        return this.dataService.getAdaptionFullDtos();
    }

    getPriceString(adaption: AdaptionShortDto) {
        return getPriceString(adaption.price, 'FIXED');
    }

    isSelected(adaptionId: number) {
        return this.selectedPossibleAdaptionIds.includes(adaptionId);
    }

    deselect(adaptionId: number) {
        this.selectedPossibleAdaptionIds =
            this.selectedPossibleAdaptionIds.filter((id) => id != adaptionId);
    }

    select(adaptionId: number) {
        this.selectedPossibleAdaptionIds.push(adaptionId);
        this.selectedPossibleAdaptionIds = [
            ...new Set(this.selectedPossibleAdaptionIds),
        ];
    }

    setPossibleProductIds() {
        if (this.forProduct) {
            this.adaptionService.linkAdaptionsToProduct(this.forProduct.id, this.selectedPossibleAdaptionIds, this.closeModal.bind(this))
        }
    }
}
