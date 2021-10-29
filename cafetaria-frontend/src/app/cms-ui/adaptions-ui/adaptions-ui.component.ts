import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdaptionService } from 'src/app/services/adaption.service';
import { CategoryService } from 'src/app/services/category.service';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/product.service';
import { getPriceString } from 'src/app/utils';
import { AdaptionArchiveModalComponent } from './adaption-archive-modal/adaption-archive-modal.component';
import { AdaptionCreateUpdateModalComponent } from './adaption-create-update-modal/adaption-create-update-modal.component';
import { EnableAdaptionsModalReversedComponent } from './enable-adaptions-modal-reversed/enable-adaptions-modal-reversed.component';

@Component({
    selector: 'app-adaptions-ui',
    templateUrl: './adaptions-ui.component.html',
    styleUrls: ['./adaptions-ui.component.scss'],
})
export class AdaptionsUiComponent implements OnInit {
    @ViewChild(AdaptionCreateUpdateModalComponent) adaptionCreateUpdateModal: AdaptionCreateUpdateModalComponent | undefined;
    @ViewChild(AdaptionArchiveModalComponent) adaptionArchiveModal: AdaptionArchiveModalComponent | undefined;
    @ViewChild(EnableAdaptionsModalReversedComponent) enableAdaptionReversedModal?: EnableAdaptionsModalReversedComponent;

    filteredAdaptionName: string | null = null;
    filteredAdaptions: AdaptionFullDto[] = [];

    constructor(private adaptionService: AdaptionService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private dataService: DataService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.categoryService.fetchCategoryShortDtos();
        this.adaptionService.fetchAdaptions(this.getFilteredAdaptions.bind(this));
        this.productService.fetchProductFullDtos();
    }

    getAdaptionsSorted() {
        return this.dataService.getAdaptionFullDtos().sort((a, b) => a.name > b.name ? 1 : -1);
    }

    getPriceString(adaption: AdaptionFullDto) {
        return getPriceString(adaption.price, "FIXED");
    }

    clearFilters() {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {aanpassing: null},
                queryParamsHandling: "merge"
            }
        )
    }

    filtersActive() {
        return this.filteredAdaptionName
    }

    setFilteredAdaptionName(adaptionName: string | null) {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {aanpassing: adaptionName == "" ? null : adaptionName},
                queryParamsHandling: "merge"
            }
        )
    }

    getFilteredAdaptions() {
        this.route.queryParamMap.subscribe(params => {
            const adaptionName = params.get("aanpassing");

            if (adaptionName) {
                this.filteredAdaptionName = adaptionName
                this.filteredAdaptions = this.getAdaptionsSorted().filter(a => a.name.toLocaleLowerCase().includes(adaptionName.toLocaleLowerCase()))
            } else {
                this.filteredAdaptionName = null;
                this.filteredAdaptions = this.getAdaptionsSorted();
            }
        })
    }



}
