import { Component, Input, OnInit } from '@angular/core';
import { AdaptionService } from 'src/app/services/adaption.service';
import { getPriceString } from 'src/app/utils';

@Component({
    selector: 'app-apply-adaptions-modal',
    templateUrl: './apply-adaptions-modal.component.html',
    styleUrls: ['./apply-adaptions-modal.component.scss'],
})
export class ApplyAdaptionsModalComponent implements OnInit {
    selectedPossibleAdaptionIds: number[] = [];

    @Input()
    setPossibleAdaptionIds: (ids: number[]) => void = () => null;

    @Input()
    set possibleAdaptionIds(ids: number[]) {
        this.selectedPossibleAdaptionIds = ids;
    }

    constructor(private adaptionService: AdaptionService) {}

    ngOnInit(): void {}

    closeModal() {
        this.selectedPossibleAdaptionIds = [];

        //@ts-ignore
        jQuery('#apply-adaptions-modal').modal('hide');
    }

    getNonArchivedAdaptionShortDtos() {
        return this.adaptionService.getAllNonArchivedAdaptions();
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
}
