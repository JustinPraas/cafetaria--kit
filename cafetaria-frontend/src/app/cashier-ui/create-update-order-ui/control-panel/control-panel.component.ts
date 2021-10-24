import {
    Component,
    EventEmitter,
    HostBinding,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NumberPadComponent } from './number-pad/number-pad.component';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {

    @ViewChild(NumberPadComponent) numberPad?: NumberPadComponent

    @Output()
    selectedCategory = new EventEmitter<CategoryShortDto | null>();

    @Output()
    onNumpadValueChangedEvent = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    clearNumpedValue() {
        if (this.numberPad) {
            this.numberPad.clearAll()
        }
    }
}
