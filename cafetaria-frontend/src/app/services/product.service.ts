import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { API_PRODUCT_URL } from '../constants';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(
        private httpClient: HttpClient,
        private toastr: ToastrService,
        private dataService: DataService
    ) {}

    onSuccess(message?: string) {
        if (message) {
            this.toastr.success(message, 'Gelukt!');
        } else {
            this.toastr.success('Gelukt!');
        }
    }

    getAllProductShortDtos() {
        return ([] as ProductShortDto[]).concat(...this.dataService.getCategoryFullDtos().map(c => c.productShortDtos));
    }

    getProductById(productId: number) {
        return this.getAllProductShortDtos().find(p => p.id == productId);
    }

    createProduct(
        productCreateUpdateDto: ProductCreateUpdateDto,
        callback?: () => void
    ) {
        this.httpClient
            .post<ProductShortDto>(
                `${API_PRODUCT_URL}`,
                productCreateUpdateDto
            )
            .subscribe((psd: ProductShortDto) => {
                this.dataService.insertProductIntoCategory(psd.categoryId, psd);
                callback ? callback() : null;
                this.onSuccess('Product toegevoegd');
            });
    }

    updateProduct(
        id: number,
        productCreateUpdateDto: ProductCreateUpdateDto,
        callback?: () => void
    ) {
        console.log(productCreateUpdateDto);
        this.httpClient
            .put<ProductShortDto>(
                `${API_PRODUCT_URL}/${id}`,
                productCreateUpdateDto
            )
            .subscribe((psd: ProductShortDto) => {
                this.dataService.updateProductInCategory(psd.categoryId, psd);
                callback ? callback() : null;
                this.onSuccess('Product bijgewerkt');
            });
    }

    archiveProduct(productToArchive: ProductShortDto, callback?: () => void) {
        this.httpClient
            .delete<boolean>(`${API_PRODUCT_URL}/${productToArchive.id}`)
            .subscribe((result: boolean) => {
                if (result) {
                    this.dataService.spliceProductFromCategory(
                        productToArchive.categoryId,
                        productToArchive.id
                    );
                    callback ? callback() : null;
                    this.onSuccess('Product gearchiveerd');
                }
            });
    }
}
