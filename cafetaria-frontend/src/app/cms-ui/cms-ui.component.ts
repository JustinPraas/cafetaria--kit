import { Component, OnInit } from '@angular/core';
import { AdaptionService } from '../adaption.service';
import { CategoryService } from '../category.service';

@Component({
    selector: 'app-cms-ui',
    templateUrl: './cms-ui.component.html',
    styleUrls: ['./cms-ui.component.scss'],
})
export class CmsUiComponent implements OnInit {
    constructor(
        private categoryService: CategoryService,
        private adaptionService: AdaptionService
    ) {}

    ngOnInit(): void {
        this.categoryService.fetchCategoryFullDtos();
        this.adaptionService.fetchAdaptions();
    }
}
