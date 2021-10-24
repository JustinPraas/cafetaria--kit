import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { ColorPickerModule } from 'ngx-color-picker';
import {MatRippleModule} from '@angular/material/core';
import { AppComponent } from './app.component';
import { CashierUiComponent } from './cashier-ui/cashier-ui.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { nl_NL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import nl from '@angular/common/locales/nl';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CmsUiComponent } from './cms-ui/cms-ui.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesUiComponent } from './cms-ui/categories-ui/categories-ui.component';
import { ProductsUiComponent } from './cms-ui/products-ui/products-ui.component';
import { CategoryCreateUpdateModalComponent } from './cms-ui/categories-ui/category-create-update-modal/category-create-update-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryArchiveModalComponent } from './cms-ui/categories-ui/category-archive-modal/category-archive-modal.component';
import { HttpConfigInterceptor } from './http-config.interceptor';
import { ProductCreateUpdateModalComponent } from './cms-ui/products-ui/product-create-update-modal/product-create-update-modal.component';
import { ProductArchiveModalComponent } from './cms-ui/products-ui/product-archive-modal/product-archive-modal.component';
import { CreateUpdateOrderUiComponent } from './cashier-ui/create-update-order-ui/create-update-order-ui.component';
import { CashierDashboardUiComponent } from './cashier-ui/cashier-dashboard-ui/cashier-dashboard-ui.component';
import { OrdersUiComponent } from './cashier-ui/orders-ui/orders-ui.component';
import { ConfirmOrderModalComponent } from './cashier-ui/create-update-order-ui/order-panel/confirm-order-modal/confirm-order-modal.component';
import { OrderComponent } from './cashier-ui/orders-ui/order/order.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdaptionsUiComponent } from './cms-ui/adaptions-ui/adaptions-ui.component';
import { AdaptionCreateUpdateModalComponent } from './cms-ui/adaptions-ui/adaption-create-update-modal/adaption-create-update-modal.component';
import { AdaptionArchiveModalComponent } from './cms-ui/adaptions-ui/adaption-archive-modal/adaption-archive-modal.component';
import { HoldDivComponent } from './hold-div/hold-div.component';
import { PayOrderModalComponent } from './cashier-ui/orders-ui/pay-order-modal/pay-order-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { EnableAdaptionsModalComponent } from './cms-ui/products-ui/enable-adaptions-modal/enable-adaptions-modal.component';
import { PendingChangesGuard } from 'src/PendingChangesGuard';
import { ReorderModalComponent } from './cms-ui/reorder-modal/reorder-modal.component';
import { EnableAdaptionsModalReversedComponent } from './cms-ui/adaptions-ui/enable-adaptions-modal-reversed/enable-adaptions-modal-reversed.component';
import { OrderPanelComponent } from './cashier-ui/create-update-order-ui/order-panel/order-panel.component';
import { ControlPanelComponent } from './cashier-ui/create-update-order-ui/control-panel/control-panel.component';
import { CategorySelectComponent } from './cashier-ui/create-update-order-ui/control-panel/category-select/category-select.component';
import { NumberPadComponent } from './cashier-ui/create-update-order-ui/control-panel/number-pad/number-pad.component';
import { ProductsSelectPanelComponent } from './cashier-ui/create-update-order-ui/products-select-panel/products-select-panel.component';
import { ButtonComponent } from './cashier-ui/create-update-order-ui/control-panel/number-pad/button/button.component';

registerLocaleData(nl);

@NgModule({
    declarations: [
        AppComponent,
        CashierUiComponent,
        CmsUiComponent,
        CategoriesUiComponent,
        ProductsUiComponent,
        CategoryCreateUpdateModalComponent,
        CategoryArchiveModalComponent,
        ProductCreateUpdateModalComponent,
        ProductArchiveModalComponent,
        CreateUpdateOrderUiComponent,
        CashierDashboardUiComponent,
        OrdersUiComponent,
        ConfirmOrderModalComponent,
        OrderComponent,
        NavbarComponent,
        AdaptionsUiComponent,
        AdaptionCreateUpdateModalComponent,
        AdaptionArchiveModalComponent,
        EnableAdaptionsModalComponent,
        HoldDivComponent,
        PayOrderModalComponent,
        ConfirmationModalComponent,
        ReorderModalComponent,
        EnableAdaptionsModalReversedComponent,
        OrderPanelComponent,
        ControlPanelComponent,
        CategorySelectComponent,
        NumberPadComponent,
        ProductsSelectPanelComponent,
        ButtonComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzLayoutModule,
        AppRoutingModule,
        NzIconModule,
        DragDropModule,
        ReactiveFormsModule,
        NgbModule,
        MatRippleModule,
        ColorPickerModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        PendingChangesGuard,
        { provide: NZ_I18N, useValue: nl_NL },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
