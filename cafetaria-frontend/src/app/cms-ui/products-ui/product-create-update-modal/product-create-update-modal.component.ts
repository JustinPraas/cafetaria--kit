import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PRICE_DECIMAL_COMMA_SEPERATED_REGEX } from 'src/app/constants';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/product.service';
import { EnableAdaptionsModalComponent } from '../enable-adaptions-modal/enable-adaptions-modal.component';
@Component({
    selector: 'app-product-create-update-modal',
    templateUrl: './product-create-update-modal.component.html',
    styleUrls: ['./product-create-update-modal.component.scss'],
})
export class ProductCreateUpdateModalComponent implements OnInit {
    @ViewChild(EnableAdaptionsModalComponent)
    enableAdaptionsModal?: EnableAdaptionsModalComponent;

    createUpdateFormGroup = new FormGroup({
        name: new FormControl(''),
        categoryId: new FormControl(null),
        price: new FormControl(''),
        priceType: new FormControl('FIXED'),
        active: new FormControl(true),
    });

    possibleAdaptionIds: number[] = [];

    productToEdit: ProductFullDto | null = null;

    constructor(
        private productService: ProductService,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        //@ts-ignore
        jQuery('#product-create-update-modal').on(
            'shown.bs.modal',
            function () {
                //@ts-ignore
                jQuery('#productName').trigger('focus');
            }
        );
    }

    getCreateUpdateModalTitle() {
        if (this.productToEdit) {
            return 'Product bijwerken';
        } else {
            return 'Product maken';
        }
    }

    getCategoryShortDtos(): CategoryShortDto[] {
        return this.dataService.getCategoryShortDtos();
    }

    setProductToEdit(product: ProductFullDto) {
        this.createUpdateFormGroup = new FormGroup({
            name: new FormControl(product.name),
            categoryId: new FormControl(product.categoryId),
            price: new FormControl(product.price),
            priceType: new FormControl(product.priceType),
            active: new FormControl(product.active),
        });
        this.productToEdit = product;
        this.possibleAdaptionIds = product.possibleAdaptionShortDtos.map(
            (pasd) => pasd.id!
        );
    }

    setPossibleAdaptionIds(ids: number[]) {
        this.possibleAdaptionIds = ids;
    }

    showPriceBox() {
        return this.createUpdateFormGroup.controls.priceType.value == 'FIXED';
    }

    closeModal() {
        this.resetProductToEdit();

        //@ts-ignore
        jQuery('#product-create-update-modal').modal('hide');
    }

    onSuccess() {
        this.closeModal();
    }

    resetProductToEdit() {
        this.createUpdateFormGroup = new FormGroup({
            name: new FormControl(''),
            categoryId: new FormControl(null),
            price: new FormControl(''),
            priceType: new FormControl('FIXED'),
            active: new FormControl(true),
        });
        this.productToEdit = null;
        this.possibleAdaptionIds = [];
    }

    onSubmit() {
        const controls = this.createUpdateFormGroup.controls;

        const productCreateUpdateDto: ProductCreateUpdateDto = {
            name: controls.name.value,
            categoryId: controls.categoryId.value,
            possibleAdaptionIds: this.possibleAdaptionIds,
            price: controls.price.value,
            priceType: controls.priceType.value,
            active: controls.active.value,
        };

        if (this.productToEdit == null) {
            this.productService.createProduct(
                productCreateUpdateDto,
                this.onSuccess.bind(this)
            );
        } else {
            this.productService.updateProduct(
                this.productToEdit.id,
                productCreateUpdateDto,
                this.onSuccess.bind(this)
            );
        }
    }

    isProductTouched() {
        return this.createUpdateFormGroup.controls.name.touched
    }

    isProductNameValid() {
        const productName = this.createUpdateFormGroup.controls.name.value
        if (productName) {
            return productName.length >= 2;
        } else {
            return false;
        }
    }

    isCategoryValid() {
        const categoryId = this.createUpdateFormGroup.controls.categoryId.value
        return categoryId != null;
    }

    isCategoryTouched() {
        return this.createUpdateFormGroup.controls.categoryId.touched
    }

    isPriceValid() {
        const price = this.createUpdateFormGroup.controls.price.value
        const priceType = this.createUpdateFormGroup.controls.priceType.value
        if (price && priceType && priceType as PriceType == "FIXED") {
            const match = (price as string).match(PRICE_DECIMAL_COMMA_SEPERATED_REGEX);
            return match ? match.length > 0 : false
        } else {
            return false
        }
    }

    isPriceTouched() {
        return this.createUpdateFormGroup.controls.price.touched
    }

    allTouched() {
        const controls = this.createUpdateFormGroup.controls;
        const priceType = controls.priceType.value
        return controls.name.touched && controls.categoryId.touched && (priceType == "FIXED" && controls.price.touched || priceType != "FIXED")
    }

    isFormValid() {
        return this.isProductNameValid() && this.isPriceValid() && this.isCategoryValid()
    }
}
