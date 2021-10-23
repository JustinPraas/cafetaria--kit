import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryCreateUpdateModalComponent } from 'src/app/cms-ui/categories-ui/category-create-update-modal/category-create-update-modal.component';
import { CategoryService } from 'src/app/services/category.service';
import { DataService } from 'src/app/services/data.service';
import { sequenceOrder } from 'src/app/utils';
import { CategoryArchiveModalComponent } from './category-archive-modal/category-archive-modal.component';

@Component({
    selector: 'app-categories-ui',
    templateUrl: './categories-ui.component.html',
    styleUrls: ['./categories-ui.component.scss'],
})
export class CategoriesUiComponent implements OnInit {
    constructor(
        private categoryService: CategoryService,
        private dataService: DataService
    ) {}

    @ViewChild(CategoryCreateUpdateModalComponent) categoryCreateUpdateModal:
        | CategoryCreateUpdateModalComponent
        | undefined;
    @ViewChild(CategoryArchiveModalComponent) categoryArchiveModal:
        | CategoryArchiveModalComponent
        | undefined;

    ngOnInit(): void {
        this.categoryService.fetchCategoryShortDtos();
    }

    getCategoryShortDtosSorted(): CategoryShortDto[] {
        return this.dataService.getCategoryShortDtos().sort(sequenceOrder);
    }

    closeReorderModal() {
        //@ts-ignore
        jQuery('#reorder-modal').modal('hide');
    }

    onApplyReorderInvoke(reorderEntitiesDto: ReorderEntitiesDto) {
        this.categoryService.reorderCategories(
            reorderEntitiesDto,
            this.closeReorderModal.bind(this)
        );
    }
}
