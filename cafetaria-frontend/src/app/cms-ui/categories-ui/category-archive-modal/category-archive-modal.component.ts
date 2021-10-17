import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
    selector: 'app-category-archive-modal',
    templateUrl: './category-archive-modal.component.html',
    styleUrls: ['./category-archive-modal.component.scss'],
})
export class CategoryArchiveModalComponent implements OnInit {
    categoryToArchive: CategoryFullDto | null = null;

    constructor(private categoryService: CategoryService) {}

    setCategoryToArchive(category: CategoryFullDto) {
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
