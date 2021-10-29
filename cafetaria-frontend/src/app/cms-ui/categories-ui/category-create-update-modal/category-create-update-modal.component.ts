import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-category-create-update-modal',
    templateUrl: './category-create-update-modal.component.html',
    styleUrls: ['./category-create-update-modal.component.scss'],
})
export class CategoryCreateUpdateModalComponent implements OnInit {
    createUpdateFormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
        active: new FormControl(true),
    });

    categoryToEdit: CategoryShortDto | null = null;
    selectedColor: string = '#059f00';

    constructor(private categoryService: CategoryService) {}

    getCreateUpdateModalTitle() {
        if (this.categoryToEdit) {
            return 'Categorie bijwerken';
        } else {
            return 'Categorie maken';
        }
    }

    setCategoryToEdit(category: CategoryShortDto) {
        this.createUpdateFormGroup = new FormGroup({
            name: new FormControl(category.name),
            active: new FormControl(category.active),
        });
        this.categoryToEdit = category;
        this.selectedColor = category.colorHex;
    }

    closeModal() {
        this.resetCategoryToEdit();

        //@ts-ignore
        jQuery('#category-create-update-modal').modal('hide');
    }

    onSuccess() {
        this.closeModal();
    }

    resetCategoryToEdit() {
        this.createUpdateFormGroup = new FormGroup({
            name: new FormControl(''),
            active: new FormControl(true),
        });
        this.categoryToEdit = null;
    }

    ngOnInit(): void {
        //@ts-ignore
        jQuery('#category-create-update-modal').on(
            'shown.bs.modal',
            function () {
                //@ts-ignore
                jQuery('#categoryName').trigger('focus');
            }
        );
    }

    onSubmit() {
        const controls = this.createUpdateFormGroup.controls;

        const categoryCreateUpdateDto: CategoryCreateUpdateDto = {
            name: controls.name.value,
            colorHex: this.selectedColor,
            active: controls.active.value,
        };

        if (this.categoryToEdit == null) {
            this.categoryService.createCategory(
                categoryCreateUpdateDto,
                this.onSuccess.bind(this)
            );
        } else {
            this.categoryService.updateCategory(
                this.categoryToEdit.id,
                categoryCreateUpdateDto,
                this.onSuccess.bind(this)
            );
        }
    }


    /**
     *
     *
     * VALIDATORS
     *
     */
    isCategoryNameValid() {
        const categoryName = this.createUpdateFormGroup.controls.name.value;
        if (categoryName) {
            return categoryName.length >= 2
        } else {
            return false;
        }
    }

    isCategoryNameTouched() {
        return this.createUpdateFormGroup.controls.name.touched;
    }

    isFormValid() {
        return this.isCategoryNameValid();
    }
}
