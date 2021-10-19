import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdaptionService } from 'src/app/services/adaption.service';

@Component({
    selector: 'app-adaption-create-update-modal',
    templateUrl: './adaption-create-update-modal.component.html',
    styleUrls: ['./adaption-create-update-modal.component.scss'],
})
export class AdaptionCreateUpdateModalComponent implements OnInit {
    createUpdateFormGroup = new FormGroup({
        name: new FormControl(''),
        price: new FormControl(''),
    });

    adaptionToEdit: AdaptionFullDto | null = null;

    constructor(private adaptionService: AdaptionService) {}

    ngOnInit(): void {}

    getCreateUpdateModalTitle() {
        if (this.adaptionToEdit) {
            return "Aanpassing bijwerken"
        } else {
            return "Aanpassing maken"
        }
    }

    setAdaptionToEdit(adaption: AdaptionFullDto) {
        this.createUpdateFormGroup = new FormGroup({
            name: new FormControl(adaption.name),
            price: new FormControl(adaption.price),
        });
        this.adaptionToEdit = adaption;
    }

    closeModal() {
        this.resetCategoryToEdit();

        //@ts-ignore
        jQuery('#adaption-create-update-modal').modal('hide');
    }

    resetCategoryToEdit() {
        this.createUpdateFormGroup = new FormGroup({
            name: new FormControl(''),
            price: new FormControl(''),
        });
        this.adaptionToEdit = null;
    }

    onSubmit() {
        const controls = this.createUpdateFormGroup.controls;

        const categoryCreateUpdateDto: AdaptionCreateUpdateDto = {
            name: controls.name.value,
            price: controls.price.value,
        };

        if (this.adaptionToEdit == null) {
            this.adaptionService.createAdaption(categoryCreateUpdateDto, this.closeModal.bind(this));
        } else {
            this.adaptionService.updateAdaption(
                this.adaptionToEdit.id,
                categoryCreateUpdateDto,
                this.closeModal.bind(this)
            );
        }
    }
}
