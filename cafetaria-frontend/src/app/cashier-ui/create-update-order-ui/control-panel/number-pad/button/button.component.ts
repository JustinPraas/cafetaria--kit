import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

    @HostBinding('class.col-4') classCol4 = true;
    @HostBinding('class.px-2') classPX1 = true;

    @Input()
    char: string = "";

    @Output()
    onButtonPressEvent = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    onPadButtonClick() {
        this.onButtonPressEvent.emit(this.char);
    }
}
