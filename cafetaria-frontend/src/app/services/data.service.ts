import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private categoryFullDtos: CategoryFullDto[] = [];
    private orderFullDtos: OrderFullDto[] = [];
    private adaptionFullDtos: AdaptionFullDto[] = [];
    private productShortDtos: ProductShortDto[] = [];

    constructor() {}

    setProductShortDtos(productShortDtos: ProductShortDto[]) {
        this.productShortDtos = productShortDtos;
    }

    setCategoryFullDtos(categoryFullDtos: CategoryFullDto[]) {
        this.categoryFullDtos = categoryFullDtos;
    }

    setOrderFullDtos(orderFullDtos: OrderFullDto[]) {
        this.orderFullDtos = orderFullDtos;
    }

    setAdaptionFullDtos(adaptionFullDtos: AdaptionFullDto[]) {
        this.adaptionFullDtos = adaptionFullDtos;
    }

    getCategoryFullDtos() {
        return this.categoryFullDtos;
    }

    getOrderFullDtos() {
        return this.orderFullDtos;
    }

    getAdaptionFullDtos() {
        return this.adaptionFullDtos;
    }

    getProductShortDtos() {
        return this.productShortDtos;
    }

    getNonArchivedProductShortDtos(categoryId: number) {
        const productShortDtos = this.categoryFullDtos.find(
            (c) => c.id === categoryId
        );
        return productShortDtos
            ? productShortDtos.productShortDtos.filter((p) => !p.archived)
            : [];
    }

    insertCategoryFullDto(categoryFullDto: CategoryFullDto) {
        this.categoryFullDtos.push(categoryFullDto);
    }

    updateCategory(categoryFullDto: CategoryFullDto) {
        this.categoryFullDtos.find((cfd, index) => {
            if (cfd.id === categoryFullDto.id) {
                this.categoryFullDtos[index] = categoryFullDto;
            }
        });
    }

    updateOrder(orderFullDto: OrderFullDto) {
        this.orderFullDtos.find((ofd, index) => {
            if (ofd.id === orderFullDto.id) {
                this.orderFullDtos[index] = orderFullDto;
            }
        });
    }

    archiveCategory(categoryToArchive: CategoryFullDto) {
        this.categoryFullDtos.find((cfd, index) => {
            if (cfd && cfd.id === categoryToArchive.id) {
                this.categoryFullDtos.splice(index, 1);
            }
        });
    }

    insertProductIntoCategory(
        categoryId: number,
        productShortDto: ProductShortDto
    ) {
        this.categoryFullDtos.find((cfd, cindex) => {
            if (cfd.id === categoryId) {
                this.categoryFullDtos[cindex].productShortDtos.push(
                    productShortDto
                );
            }
        });
    }

    updateProductInCategory(categoryId: number, product: ProductShortDto) {
        this.categoryFullDtos.find((cfd, cindex) => {
            if (cfd.id === categoryId) {
                this.categoryFullDtos[cindex].productShortDtos.find(
                    (psd, pindex) => {
                        if (psd.id === product.id) {
                            this.categoryFullDtos[cindex].productShortDtos[
                                pindex
                            ] = product;
                        }
                    }
                );
            }
        });
    }

    spliceProductFromCategory(categoryId: number, productId: number) {
        this.categoryFullDtos.find((cfd, cindex) => {
            if (cfd.id === categoryId) {
                this.categoryFullDtos[cindex].productShortDtos.find(
                    (psd, pindex) => {
                        if (psd && psd.id === productId) {
                            this.categoryFullDtos[
                                cindex
                            ].productShortDtos.splice(pindex, 1);
                        }
                    }
                );
            }
        });
    }

    insertAdaptionIntoAdaptionFullDtos(adaptionFullDto: AdaptionFullDto) {
        this.adaptionFullDtos.push(adaptionFullDto);
    }

    updateAdaption(adaptionFullDto: AdaptionFullDto) {
        this.adaptionFullDtos.find((afd, index) => {
            if (afd.id === adaptionFullDto.id) {
                this.adaptionFullDtos[index] = adaptionFullDto;
            }
        });
    }

    archiveAdaption(adaptionToArchive: AdaptionFullDto) {
        this.adaptionFullDtos.find((afd, index) => {
            if (afd && afd.id === adaptionToArchive.id) {
                this.adaptionFullDtos.splice(index, 1);
            }
        });
    }
}
