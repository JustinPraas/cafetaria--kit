import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
    selector: 'app-product-create-update-modal',
    templateUrl: './product-create-update-modal.component.html',
    styleUrls: ['./product-create-update-modal.component.scss'],
})
export class ProductCreateUpdateModalComponent implements OnInit {
    createUpdateFormGroup = new FormGroup({
        name: new FormControl(''),
        categoryId: new FormControl(0),
        price: new FormControl(''),
        priceType: new FormControl('FIXED'),
        active: new FormControl(true),
    });

    productToEdit: ProductShortDto | null = null;

    constructor(private productService: ProductService, private categoryService: CategoryService) {}

    getCreateUpdateModalTitle() {
        if (this.productToEdit) {
            return 'Product bijwerken';
        } else {
            return 'Product maken';
        }
    }

    getCategories() {
        return this.categoryService.getCategoryFullDtos();
    }

    setProductToEdit(product: ProductShortDto) {
        this.createUpdateFormGroup = new FormGroup({
            name: new FormControl(product.name),
            categoryId: new FormControl(product.categoryId),
            price: new FormControl(product.price),
            priceType: new FormControl(product.priceType),
            // fixedPrice: new FormControl(product.priceType == "FIXED"),
            // variablePrice: new FormControl(product.priceType == "VARIABLE"),
            // freePrice: new FormControl(product.priceType == "FREE"),
            active: new FormControl(product.active),
        });
        this.productToEdit = product;
    }

    showPriceBox() {
        return this.createUpdateFormGroup.controls.priceType.value == "FIXED";
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
            categoryId: new FormControl(0),
            price: new FormControl(''),
            priceType: new FormControl('FIXED'),
            active: new FormControl(true),
        });
        this.productToEdit = null;
    }

    ngOnInit(): void {}

    onSubmit() {
        const controls = this.createUpdateFormGroup.controls;

        const productCreateUpdateDto: ProductCreateUpdateDto = {
            name: controls.name.value,
            categoryId: controls.categoryId.value,
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
