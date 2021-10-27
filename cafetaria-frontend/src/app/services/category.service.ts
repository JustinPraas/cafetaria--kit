import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { API_CATEGORY_URL } from '../constants';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(
        private httpClient: HttpClient,
        private dataService: DataService,
        private toastr: ToastrService
    ) {}

    onSuccess(message?: string) {
        if (message) {
            this.toastr.success(message, 'Gelukt!');
        } else {
            this.toastr.success('Gelukt!');
        }
    }

    getCategoryFullDtos() {
        return this.dataService.getCategoryFullDtos();
    }

    fetchCategoryShortDtos(callback?: () => void) {
        this.httpClient
            .get<CategoryShortDto[]>(`${API_CATEGORY_URL}/short`)
            .subscribe((csd: CategoryShortDto[]) => {
                this.dataService.setCategoryShortDtos(csd);
                callback ? callback() : null;
            });
    }

    fetchCategoryFullDtos() {
        this.httpClient
            .get<CategoryFullDto[]>(`${API_CATEGORY_URL}/full`)
            .subscribe((cfd: CategoryFullDto[]) => {
                this.dataService.setCategoryFullDtos(cfd);
            });
    }

    createCategory(
        categoryCreateUpdateDto: CategoryCreateUpdateDto,
        callback?: () => void
    ) {
        this.httpClient
            .post<CategoryFullDto>(
                `${API_CATEGORY_URL}`,
                categoryCreateUpdateDto
            )
            .subscribe((cfd: CategoryFullDto) => {
                this.dataService.insertCategoryFullDto(cfd);
                callback ? callback() : null;
                this.onSuccess('Categorie toegevoegd');
            });
    }

    updateCategory(
        id: number,
        categoryCreateUpdateDto: CategoryCreateUpdateDto,
        callback?: () => void
    ) {
        this.httpClient
            .put<CategoryFullDto>(
                `${API_CATEGORY_URL}/${id}`,
                categoryCreateUpdateDto
            )
            .subscribe((cfd: CategoryFullDto) => {
                this.dataService.updateCategory(cfd);
                callback ? callback() : null;
                this.onSuccess('Categorie bijgewerkt');
            });
    }

    archiveCategory(categoryToArchive: CategoryShortDto, callback?: () => void) {
        this.httpClient
            .delete<boolean>(`${API_CATEGORY_URL}/${categoryToArchive.id}`)
            .subscribe((result: boolean) => {
                if (result) {
                    this.dataService.archiveCategory(categoryToArchive);
                    callback ? callback() : null;
                    this.onSuccess('Categorie gearchiveerd');
                }
            });
    }

    reorderCategories(
        idToSequenceOrderMap: ReorderEntitiesDto,
        callback?: () => void
    ) {
        this.httpClient
            .put<CategoryFullDto[]>(
                `${API_CATEGORY_URL}/reorder`,
                idToSequenceOrderMap
            )
            .subscribe((result: CategoryFullDto[]) => {
                if (result) {
                    this.dataService.setCategoryFullDtos(result);
                    callback ? callback() : null;
                    this.onSuccess('Volgorde aangepast!');
                }
            });
    }
}
