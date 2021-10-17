import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-set-price-modal',
    templateUrl: './set-price-modal.component.html',
    styleUrls: ['./set-price-modal.component.scss'],
})
export class SetPriceModalComponent implements OnInit {
    @Input()
    productId: number | null = null;

    @Input()
    addProductOrder:
        | ((productOrder: ProductOrderCreateUpdateDto) => void)
        | undefined;

    setPriceFormGroup = new FormGroup({
        price: new FormControl(''),
    });

    constructor(private toastr: ToastrService) {}

    ngOnInit(): void {}

    closeModal() {
        this.setPriceFormGroup = new FormGroup({
            price: new FormControl(''),
        });

        //@ts-ignore
        jQuery('#set-price-modal').modal('hide');
    }

    addChar(char: string) {
        const currentValue = this.setPriceFormGroup.controls.price.value;
        this.setPriceFormGroup.setControl(
            'price',
            new FormControl(currentValue + char)
        );
    }

    removeChar() {
        const currentValue = this.setPriceFormGroup.controls.price
            .value as string;

        if (currentValue && currentValue.length == 0) return;

        this.setPriceFormGroup.setControl(
            'price',
            new FormControl(currentValue.slice(0, currentValue.length - 1))
        );
    }

    onSubmit() {
        const price = this.setPriceFormGroup.controls.price.value;
        if (this.addProductOrder && this.productId && price) {
            const currencyRegexCommaSeperated =
                /^[+-]?[0-9]{1,3}(?:\.?[0-9]{3})*(?:,[0-9]{1,2})?$/;
            if (price && price.match(currencyRegexCommaSeperated)) {
                this.addProductOrder({
                    id: 0,
                    productId: this.productId,
                    price,
                    quantity: 1,
                    adjustment: '',
                });
                this.closeModal();
            } else {
                this.toastr.error(
                    'Het gegeven geldbedrag is niet geldig',
                    'Ongeldig geldbedrag'
                );
            }
        } else {
            this.toastr.error('Er ging iets fout');
        }
    }
}
