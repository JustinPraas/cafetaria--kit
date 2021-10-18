import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierUiComponent } from './cashier-ui/cashier-ui.component';
import { CmsUiComponent } from './cms-ui/cms-ui.component';
import { CategoriesUiComponent } from './cms-ui/categories-ui/categories-ui.component';
import { ProductsUiComponent } from './cms-ui/products-ui/products-ui.component';
import { CreateUpdateOrderUiComponent } from './cashier-ui/create-update-order-ui/create-update-order-ui.component';
import { OrdersUiComponent } from './cashier-ui/orders-ui/orders-ui.component';
import { CashierDashboardUiComponent } from './cashier-ui/cashier-dashboard-ui/cashier-dashboard-ui.component';
import { AdaptionsUiComponent } from './cms-ui/adaptions-ui/adaptions-ui.component';

const routes: Routes = [
    { path: 'kassa', component: CashierUiComponent, children: [
        { path: 'bestellingen/nieuw', component: CreateUpdateOrderUiComponent},
        { path: 'bestellingen/:id', component: CreateUpdateOrderUiComponent},
        { path: 'bestellingen', component: OrdersUiComponent},
        { path: 'overzicht', component: CashierDashboardUiComponent}
    ] },
    { path: 'cms', component: CmsUiComponent, children: [
        {
            path: 'categoriën',
            component: CategoriesUiComponent,
        },
        {
            path: 'producten',
            component: ProductsUiComponent,
        },
        {
            path: 'aanpassingen',
            component: AdaptionsUiComponent,
        },
    ] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
