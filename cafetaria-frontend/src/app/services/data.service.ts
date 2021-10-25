import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private categoryShortDtos: CategoryShortDto[] = [];
    private categoryFullDtos: CategoryFullDto[] = [];
    private orderFullDtos: OrderFullDto[] = [];
    private adaptionFullDtos: AdaptionFullDto[] = [];
    private adaptionRanksDto: AdaptionRanksDto = {adaptionRanks: {}}
    private productFullDtos: ProductFullDto[] = [];

    constructor() {}

    setProductFullDtos(productFullDtos: ProductFullDto[]) {
        this.productFullDtos = productFullDtos;
    }

    setCategoryShortDtos(categoryShortDtos: CategoryShortDto[]) {
        this.categoryShortDtos = categoryShortDtos;
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

    setAdaptionRanksDto(ranks: AdaptionRanksDto) {
        this.adaptionRanksDto = ranks;
    }

    getCategoryShortDtos() {
        return this.categoryShortDtos;
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

    getAdaptionRanks() {
        return this.adaptionRanksDto.adaptionRanks
    }

    getProductFullDtos() {
        return this.productFullDtos;
    }

    getNonArchivedProductFullDtos(categoryId: number) {
        const category = this.categoryFullDtos.find((c) => c.id === categoryId);
        return category
            ? category.productShortDtos.filter((p) => !p.archived)
            : [];
    }

    /**
     * CRUD CATEGORIES
     */
    insertCategoryFullDto(categoryShortDto: CategoryShortDto) {
        this.categoryShortDtos.push(categoryShortDto);
    }

    updateCategory(categoryShortDto: CategoryShortDto) {
        this.categoryShortDtos.find((cfd, index) => {
            if (cfd.id === categoryShortDto.id) {
                this.categoryShortDtos[index] = categoryShortDto;
            }
        });
    }

    archiveCategory(categoryToArchive: CategoryShortDto) {
        this.categoryShortDtos.find((cfd, index) => {
            if (cfd && cfd.id === categoryToArchive.id) {
                this.categoryShortDtos.splice(index, 1);
            }
        });
    }

    /**
     * CRUD ORDER
     */
    updateOrder(orderFullDto: OrderFullDto) {
        this.orderFullDtos.find((ofd, index) => {
            if (ofd.id === orderFullDto.id) {
                this.orderFullDtos[index] = orderFullDto;
            }
        });
    }

    /**
     * CRUD PRODUCTS
     */
    insertProduct(productFullDto: ProductFullDto) {
        this.productFullDtos.push(productFullDto);
    }

    updateProduct(product: ProductFullDto) {
        this.productFullDtos.find((psd, pindex) => {
            if (psd.id === product.id) {
                this.productFullDtos[pindex] = product;
            }
        });
    }

    archiveProduct(productId: number) {
        this.productFullDtos.find((psd, pindex) => {
            if (psd && psd.id === productId) {
                this.productFullDtos.splice(pindex, 1);
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
