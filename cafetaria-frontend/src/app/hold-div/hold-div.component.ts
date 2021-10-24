import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'app-hold-div',
    templateUrl: './hold-div.component.html',
    styleUrls: ['./hold-div.component.scss'],
})
export class HoldDivComponent {

    public static readonly HOLD_DURATION: number = 300;

    holding: boolean = false;

    timeout: ReturnType<typeof setTimeout> | null = null;

    @Output()
    onHoldEvent = new EventEmitter<undefined>()

    @Output()
    onClickEvent = new EventEmitter<undefined>();

    @HostListener('pointerdown') onPointerDown() {
        this.holding = true;

        this.timeout = setTimeout(() => {
            this.onHoldEvent.emit();
            this.holding = false;
            this.timeout = null;
        }, HoldDivComponent.HOLD_DURATION);
    }

    @HostListener('pointerup') onPointerUp() {
        this.holding = false;
        if (this.timeout) {
            this.onClickEvent.emit();
            clearTimeout(this.timeout);
        }
    }
}
