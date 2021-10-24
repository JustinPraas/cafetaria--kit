import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-number-pad',
    templateUrl: './number-pad.component.html',
    styleUrls: ['./number-pad.component.scss'],
})
export class NumberPadComponent implements OnInit {
    constructor() {}

    @Output()
    onValueChangedEvent = new EventEmitter<string>()

    value: string = ""

    ngOnInit(): void {}

    addEntry(char: string) {
        this.value += char;
        this.onValueChangedEvent.emit(this.value);
    }

    clearEntry() {
        if (this.value.length == 0) return;
        else {
            this.value = this.value.slice(0, this.value.length - 1)
            this.onValueChangedEvent.emit(this.value);
        }
    }

    clearAll() {
        this.value = ""
        this.onValueChangedEvent.emit(this.value);
    }
}
