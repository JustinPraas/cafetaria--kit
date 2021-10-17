import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-pad-button',
    templateUrl: './pad-button.component.html',
    styleUrls: ['./pad-button.component.scss'],
})
export class PadButtonComponent implements OnInit {

    @Input()
    onPadButtonClick: (char: string) => void = () => null;

    @Input()
    char: string | null  = null;

    constructor() {}

    ngOnInit(): void {}
}
