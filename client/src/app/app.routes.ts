import { Routes } from '@angular/router';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'rules', component: RulesPageComponent },
  { path: 'orders', component: OrdersPageComponent },
  { path: '', redirectTo: '/rules', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
