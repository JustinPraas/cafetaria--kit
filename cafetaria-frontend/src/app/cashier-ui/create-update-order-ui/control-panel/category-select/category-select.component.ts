import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { hexToRGB, sequenceOrder } from 'src/app/utils';

@Component({
    selector: 'app-category-select',
    templateUrl: './category-select.component.html',
    styleUrls: ['./category-select.component.scss'],
})
export class CategorySelectComponent implements OnInit {

    @Output()
    selectedCategory = new EventEmitter<CategoryShortDto | null>();

    constructor(private dataService: DataService) {}

    ngOnInit(): void {}

    setSelectedCategory(category: CategoryShortDto | null) {
        this.selectedCategory.emit(category);
    }

    getCategoryShortDtosSorted() {
        return this.dataService
            .getCategoryShortDtos()
            .filter((c) => c.active)
            .sort(sequenceOrder);
    }

    getCategoryById(categoryId: number) {
        return this.dataService
            .getCategoryShortDtos()
            .find((c) => c.id == categoryId);
    }

    getColor(categoryId: number, alpha?: number) {
        const category = this.getCategoryById(categoryId);
        if (!category) {
            return hexToRGB('#cccccc', alpha ? alpha : 1);
        } else {
            return hexToRGB(category.colorHex, alpha ? alpha : 1);
        }
    }
}
