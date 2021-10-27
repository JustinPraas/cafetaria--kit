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

    fetchProductFullDtos(callback?: () => void) {
        this.httpClient
            .get<ProductFullDto[]>(`${API_PRODUCT_URL}/full`)
            .subscribe((psds) => {
                this.dataService.setProductFullDtos(psds);
                callback ? callback() : null;
            });
    }

    getAllProductFullDtos() {
        return this.dataService.getProductFullDtos();
    }

    getProductById(productId: number) {
        return this.getAllProductFullDtos().find((p) => p.id == productId);
    }

    createProduct(
        productCreateUpdateDto: ProductCreateUpdateDto,
        callback?: () => void
    ) {
        this.httpClient
            .post<ProductFullDto>(`${API_PRODUCT_URL}`, productCreateUpdateDto)
            .subscribe((psd: ProductFullDto) => {
                this.dataService.insertProduct(psd);
                callback ? callback() : null;
                this.onSuccess('Product toegevoegd');
            });
    }

    updateProduct(
        id: number,
        productCreateUpdateDto: ProductCreateUpdateDto,
        callback?: () => void
    ) {
        this.httpClient
            .put<ProductFullDto>(
                `${API_PRODUCT_URL}/${id}`,
                productCreateUpdateDto
            )
            .subscribe((psd: ProductFullDto) => {
                this.dataService.updateProduct(psd);
                callback ? callback() : null;
                this.onSuccess('Product bijgewerkt');
            });
    }

    archiveProduct(productToArchive: ProductFullDto, callback?: () => void) {
        this.httpClient
            .delete<boolean>(`${API_PRODUCT_URL}/${productToArchive.id}`)
            .subscribe((result: boolean) => {
                if (result) {
                    this.dataService.archiveProduct(productToArchive.id);
                    callback ? callback() : null;
                    this.onSuccess('Product gearchiveerd');
                }
            });
    }

    reorderProducts(
        idToSequenceOrderMap: ReorderEntitiesDto,
        callback?: () => void
    ) {
        this.httpClient
            .put<ProductFullDto[]>(
                `${API_PRODUCT_URL}/reorder`,
                idToSequenceOrderMap
            )
            .subscribe((result: ProductFullDto[]) => {
                if (result) {
                    result.forEach(p => {
                        this.dataService.updateProduct(p);
                    })
                    callback ? callback() : null;
                    this.onSuccess('Volgorde aangepast!');
                }
            });
    }
}
