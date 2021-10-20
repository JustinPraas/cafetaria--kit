import { Component, HostListener, Input } from '@angular/core';

@Component({
    selector: 'app-hold-div',
    templateUrl: './hold-div.component.html',
    styleUrls: ['./hold-div.component.scss'],
})
export class HoldDivComponent {
    @HostListener('pointerdown') onPointerDown() {
        this.holding = true;

        this.timeout = setTimeout(() => {
            this.onHoldInvoke ? this.onHoldInvoke() : null;
            this.holding = false;
            this.timeout = null;
        }, 500);
    }

    @HostListener('pointerup') onPointerUp() {
        this.holding = false;
        if (this.timeout) {
            this.onClickInvoke ? this.onClickInvoke() : null;
            clearTimeout(this.timeout);
        }
    }

    holding: boolean = false;

    timeout: ReturnType<typeof setTimeout> | null = null;

    @Input()
    onClickInvoke?: () => void;

    @Input()
    onHoldInvoke?: () => void;
}
