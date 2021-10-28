import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ORGANIZATION } from '../constants';

@Component({
    selector: 'app-cms-ui',
    templateUrl: './cms-ui.component.html',
    styleUrls: ['./cms-ui.component.scss'],
})
export class CmsUiComponent implements OnInit {
    constructor(private titleService: Title) {}

    ngOnInit(): void {
        this.titleService.setTitle(`${ORGANIZATION} - Content Management`)
    }
}
