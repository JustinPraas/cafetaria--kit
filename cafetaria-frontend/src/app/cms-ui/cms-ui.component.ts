import { Component, OnInit } from '@angular/core';
import { AdaptionService } from '../services/adaption.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-cms-ui',
    templateUrl: './cms-ui.component.html',
    styleUrls: ['./cms-ui.component.scss'],
})
export class CmsUiComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
