import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PRICE_DECIMAL_COMMA_SEPERATED_REGEX } from 'src/app/constants';
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

    ngOnInit(): void {
        //@ts-ignore
        jQuery('#adaption-create-update-modal').on('shown.bs.modal', function () {
            //@ts-ignore
            jQuery('#adaptionName').trigger('focus');
        });
    }

    getCreateUpdateModalTitle() {
        if (this.adaptionToEdit) {
            return 'Aanpassing bijwerken';
        } else {
            return 'Aanpassing maken';
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
            this.adaptionService.createAdaption(
                categoryCreateUpdateDto,
                this.closeModal.bind(this)
            );
        } else {
            this.adaptionService.updateAdaption(
                this.adaptionToEdit.id!,
                categoryCreateUpdateDto,
                this.closeModal.bind(this)
            );
        }
    }

    isAdaptionNameTouched() {
        return this.createUpdateFormGroup.controls.name.touched
    }

    isAdaptionNameValid() {
        const adaptionName = this.createUpdateFormGroup.controls.name.value
        if (adaptionName) {
            return adaptionName.length >= 2;
        } else {
            return false;
        }
    }

    isPriceValid() {
        const price = this.createUpdateFormGroup.controls.price.value
        if (price != null) {
            if (price.length == 0) {
                return true;
            } else {
                const match = (price as string).match(PRICE_DECIMAL_COMMA_SEPERATED_REGEX);
                return match ? match.length > 0 : false
            }
        } else {
            return false
        }
    }

    isPriceTouched() {
        return this.createUpdateFormGroup.controls.price.touched
    }

    allTouched() {
        return this.isPriceTouched() && this.isAdaptionNameTouched();
    }

    isFormValid() {
        return this.isAdaptionNameValid() && this.isPriceValid()
    }
}


