import { Component, OnInit, ViewChild } from '@angular/core';
import { AdaptionService } from 'src/app/adaption.service';
import { getPriceString } from 'src/app/utils';
import { AdaptionArchiveModalComponent } from './adaption-archive-modal/adaption-archive-modal.component';
import { AdaptionCreateUpdateModalComponent } from './adaption-create-update-modal/adaption-create-update-modal.component';

@Component({
    selector: 'app-adaptions-ui',
    templateUrl: './adaptions-ui.component.html',
    styleUrls: ['./adaptions-ui.component.scss'],
})
export class AdaptionsUiComponent implements OnInit {
    @ViewChild(AdaptionCreateUpdateModalComponent) adaptionCreateUpdateModal: AdaptionCreateUpdateModalComponent | undefined;
    @ViewChild(AdaptionArchiveModalComponent) adaptionArchiveModal: AdaptionArchiveModalComponent | undefined;

    constructor(private adaptionService: AdaptionService) {}

    ngOnInit(): void {
        this.adaptionService.fetchAdaptions();
    }

    getAdaptions() {
        return this.adaptionService.getAllNonArchivedAdaptions();
    }

    getPriceString(adaption: AdaptionFullDto) {
        return getPriceString(adaption.price, "FIXED");
    }

}
