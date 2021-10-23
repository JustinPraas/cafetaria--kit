import { Component, OnInit, ViewChild } from '@angular/core';
import { AdaptionService } from 'src/app/services/adaption.service';
import { ProductService } from 'src/app/services/product.service';
import { getPriceString } from 'src/app/utils';
import { AdaptionArchiveModalComponent } from './adaption-archive-modal/adaption-archive-modal.component';
import { AdaptionCreateUpdateModalComponent } from './adaption-create-update-modal/adaption-create-update-modal.component';
import { EnableAdaptionsModalReversedComponent } from './enable-adaptions-modal-reversed/enable-adaptions-modal-reversed.component';

@Component({
    selector: 'app-adaptions-ui',
    templateUrl: './adaptions-ui.component.html',
    styleUrls: ['./adaptions-ui.component.scss'],
})
export class AdaptionsUiComponent implements OnInit {
    @ViewChild(AdaptionCreateUpdateModalComponent) adaptionCreateUpdateModal: AdaptionCreateUpdateModalComponent | undefined;
    @ViewChild(AdaptionArchiveModalComponent) adaptionArchiveModal: AdaptionArchiveModalComponent | undefined;
    @ViewChild(EnableAdaptionsModalReversedComponent) enableAdaptionReversedModal?: EnableAdaptionsModalReversedComponent;

    constructor(private adaptionService: AdaptionService, private productService: ProductService) {}

    ngOnInit(): void {
        this.adaptionService.fetchAdaptions();
        this.productService.fetchProductFullDtos();
    }

    getAdaptions() {
        return this.adaptionService.getAdaptions();
    }

    getPriceString(adaption: AdaptionFullDto) {
        return getPriceString(adaption.price, "FIXED");
    }

}
