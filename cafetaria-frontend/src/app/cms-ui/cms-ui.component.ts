import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
    selector: 'app-cms-ui',
    templateUrl: './cms-ui.component.html',
    styleUrls: ['./cms-ui.component.scss'],
})
export class CmsUiComponent implements OnInit {
    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService.fetchCategoryFullDtos();
    }
}
