import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-archive-modal',
    templateUrl: './product-archive-modal.component.html',
    styleUrls: ['./product-archive-modal.component.scss'],
})
export class ProductArchiveModalComponent implements OnInit {
    productToArchive: ProductFullDto | null = null;

    constructor(private productService: ProductService) {}

    setProductToArchive(produt: ProductFullDto) {
        this.productToArchive = produt;
    }

    closeModal() {
        this.productToArchive = null;

        //@ts-ignore
        jQuery('#product-archive-modal').modal('hide');
    }

    onSuccess() {
        this.closeModal();
    }

    archiveProduct() {
        this.productService.archiveProduct(
            this.productToArchive!,
            this.onSuccess.bind(this)
        );
    }

    ngOnInit(): void {}
}
