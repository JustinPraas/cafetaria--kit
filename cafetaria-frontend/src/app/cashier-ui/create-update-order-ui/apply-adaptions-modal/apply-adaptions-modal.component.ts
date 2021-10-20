import { Component, OnInit } from '@angular/core';
import { getPriceString } from 'src/app/utils';

@Component({
    selector: 'app-apply-adaptions-modal',
    templateUrl: './apply-adaptions-modal.component.html',
    styleUrls: ['./apply-adaptions-modal.component.scss'],
})
export class ApplyAdaptionsModalComponent implements OnInit {
    selectedAdaptionShortDtos: AdaptionShortDto[] = [];

    forProduct: ProductShortDto | null = null;

    forProductOrderCreateUpdateDto?: ProductOrderCreateUpdateDto;

    onApplyAdaptionShortDtos: (product: ProductShortDto, appliedAdaptionShortDtos: AdaptionShortDto[], productCreateUpdateOrderDto?: ProductOrderCreateUpdateDto) => void = () => null;

    ngOnInit(): void {}

    closeModal() {
        this.forProduct = null;
        this.selectedAdaptionShortDtos = [];
        //@ts-ignore
        jQuery('#apply-adaptions-modal').modal('hide');
    }

    getPriceString(adaption: AdaptionShortDto) {
        return getPriceString(adaption.price, 'FIXED');
    }

    isSelected(adaptionShortDto: AdaptionShortDto) {
        return this.selectedAdaptionShortDtos.map(asd => asd.name).includes(adaptionShortDto.name);
    }

    deselect(adaptionShortDto: AdaptionShortDto) {
        this.selectedAdaptionShortDtos =
            this.selectedAdaptionShortDtos.filter((asd) => asd.name != adaptionShortDto.name);
    }

    select(adaptionShortDto: AdaptionShortDto) {
        this.selectedAdaptionShortDtos.push(adaptionShortDto);
    }
}
