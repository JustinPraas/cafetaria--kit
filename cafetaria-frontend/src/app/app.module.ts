import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

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
import { SetPriceModalComponent } from './cashier-ui/create-update-order-ui/set-price-modal/set-price-modal.component';
import { ConfirmOrderModalComponent } from './cashier-ui/create-update-order-ui/confirm-order-modal/confirm-order-modal.component';
import { OrderComponent } from './cashier-ui/orders-ui/order/order.component';
import { PadButtonComponent } from './cashier-ui/create-update-order-ui/set-price-modal/pad-button/pad-button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdaptionsUiComponent } from './cms-ui/adaptions-ui/adaptions-ui.component';
import { AdaptionCreateUpdateModalComponent } from './cms-ui/adaptions-ui/adaption-create-update-modal/adaption-create-update-modal.component';
import { AdaptionArchiveModalComponent } from './cms-ui/adaptions-ui/adaption-archive-modal/adaption-archive-modal.component';
import { EnableAdaptionsModalComponent } from './cms-ui/products-ui/product-create-update-modal/enable-adaptions-modal/enable-adaptions-modal.component';
import { HoldDivComponent } from './hold-div/hold-div.component';
import { ApplyAdaptionsModalComponent } from './cashier-ui/create-update-order-ui/apply-adaptions-modal/apply-adaptions-modal.component';
import { PayOrderModalComponent } from './cashier-ui/orders-ui/pay-order-modal/pay-order-modal.component';

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
        SetPriceModalComponent,
        ConfirmOrderModalComponent,
        OrderComponent,
        PadButtonComponent,
        NavbarComponent,
        AdaptionsUiComponent,
        AdaptionCreateUpdateModalComponent,
        AdaptionArchiveModalComponent,
        ApplyAdaptionsModalComponent,
        EnableAdaptionsModalComponent,
        HoldDivComponent,
        PayOrderModalComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzLayoutModule,
        AppRoutingModule,
        NzIconModule,
        ReactiveFormsModule,
        NgbModule,
        MatRippleModule,
        ColorPickerModule,
        ToastrModule.forRoot(),
    ],
    providers: [
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
