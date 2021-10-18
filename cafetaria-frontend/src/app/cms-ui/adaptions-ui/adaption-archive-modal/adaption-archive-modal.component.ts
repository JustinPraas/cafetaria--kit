import { Component, OnInit } from '@angular/core';
import { AdaptionService } from 'src/app/adaption.service';

@Component({
    selector: 'app-adaption-archive-modal',
    templateUrl: './adaption-archive-modal.component.html',
    styleUrls: ['./adaption-archive-modal.component.scss'],
})
export class AdaptionArchiveModalComponent implements OnInit {
    adaptionToArchive: AdaptionFullDto | null = null;

    constructor(private adaptionService: AdaptionService) {}

    ngOnInit(): void {}

    closeModal() {
        this.adaptionToArchive = null;

        //@ts-ignore
        jQuery('#adaption-archive-modal').modal('hide');
    }

    setAdaptionToArchive(adaptionToArchive: AdaptionFullDto) {
        this.adaptionToArchive = adaptionToArchive;
    }

    archiveCategory() {
        this.adaptionService.archiveAdaption(this.adaptionToArchive!, this.closeModal.bind(this));
    }
}
