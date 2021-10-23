import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {

    @Input()
    message?: string;

    @Input()
    onConfirmation?: () => void;

    constructor() {}

    ngOnInit(): void {}

    closeModal() {
        //@ts-ignore
        jQuery('#confirmation-modal').modal('hide');
    }

    showModal() {
        //@ts-ignore
        jQuery('#confirmation-modal').modal('show');
    }

    setMessage(message: string) {
        this.message = message;
    }

    setOnConfirmation(onConfirmation: () => void) {
        this.onConfirmation = onConfirmation;
    }
}
