import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { getNumpadPriceValue, getNumpadQuantityValue } from 'src/app/utils';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { ProductsSelectPanelComponent } from './products-select-panel/products-select-panel.component';

@Component({
    selector: 'app-create-update-order-ui',
    templateUrl: './create-update-order-ui.component.html',
    styleUrls: ['./create-update-order-ui.component.scss'],
})
export class CreateUpdateOrderUiComponent implements OnInit {
    @ViewChild(OrderPanelComponent) orderPanel?: OrderPanelComponent;
    @ViewChild(ControlPanelComponent) controlPanel?: ControlPanelComponent;
    @ViewChild(ProductsSelectPanelComponent)
    productPanel?: ProductsSelectPanelComponent;

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return !this.orderPanel?.changes;
    }

    constructor(private dataService: DataService) {}

    selectedCategory: CategoryShortDto | null = null;
    selectedProduct: ProductFullDto | null = null;
    productOrderToEdit: ProductOrderCreateUpdateDto | null = null;

    numpadValue: string = '';

    ngOnInit(): void {}

    setSelectedCategory(category: CategoryShortDto | null) {
        this.selectedCategory = category;
    }

    setProductOrderToEdit(product: ProductOrderCreateUpdateDto) {
        this.productOrderToEdit = product;
    }

    clearSelectedProduct() {
        this.selectedProduct = null;
    }

    getForProduct(): ProductFullDto | null {
        const productInProductOrderToEdit = this.productOrderToEdit ? this.getProductById(this.productOrderToEdit.productId) : null
        return this.productOrderToEdit ? (productInProductOrderToEdit ? productInProductOrderToEdit : null) : this.selectedProduct
    }

    getProductById(productId: number) {
        return this.dataService
            .getProductFullDtos()
            .find((p) => p.id == productId);
    }

    /**
     *
     *
     * Product Order creation functionality
     *
     *
     */
    onProductClickedEventInvoke(product: ProductFullDto) {
        this.productOrderToEdit = null;

        const newProductOrderCreateUpdate: ProductOrderCreateUpdateDto = {
            productId: product.id,
            price: '',
            quantity: 1,
            appliedAdaptionShortDtos: [],
        };

        if (product.priceType == 'VARIABLE') {
            const price = getNumpadPriceValue(this.numpadValue);
            newProductOrderCreateUpdate.price = price;
            newProductOrderCreateUpdate.quantity = 1;
        } else {
            newProductOrderCreateUpdate.price = product.price;
            newProductOrderCreateUpdate.quantity = getNumpadQuantityValue(
                this.numpadValue
            );
        }

        this.orderPanel!.addProductOrder(newProductOrderCreateUpdate);
        this.selectedProduct = product;
        this.clearNumpadValue();
    }

    onAdaptionClickedEventInvoke(event: {
        adaption: AdaptionShortDto;
        add: boolean;
    }) {
        const productOrder = this.productOrderToEdit
            ? this.productOrderToEdit
            : this.orderPanel!.productOrderCreateUpdates[
                  this.orderPanel!.productOrderCreateUpdates.length - 1
              ];

        if (event.add) {
            productOrder.appliedAdaptionShortDtos.push(event.adaption);
        } else {
            const index = productOrder.appliedAdaptionShortDtos.findIndex(asd => asd.name == event.adaption.name)
            productOrder.appliedAdaptionShortDtos.splice(index, 1);
        }
    }

    onNumpadValueChangedEventInvoke(value: string) {
        this.numpadValue = value;
    }

    clearNumpadValue() {
        if (this.controlPanel) {
            this.controlPanel.clearNumpedValue();
        }
    }
}
