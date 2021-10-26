import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
}
