import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-archive-modal',
    templateUrl: './category-archive-modal.component.html',
    styleUrls: ['./category-archive-modal.component.scss'],
})
export class CategoryArchiveModalComponent implements OnInit {
    categoryToArchive: CategoryShortDto | null = null;

    constructor(private categoryService: CategoryService) {}

    setCategoryToArchive(category: CategoryShortDto) {
        this.categoryToArchive = category;
    }

    closeModal() {
        this.categoryToArchive = null;

        //@ts-ignore
        jQuery('#category-archive-modal').modal('hide');
    }

    onSuccess() {
        this.closeModal();
    }

    archiveCategory() {
        this.categoryService.archiveCategory(this.categoryToArchive!, this.onSuccess.bind(this));
    }

    ngOnInit(): void {}
}
