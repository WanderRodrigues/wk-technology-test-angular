import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersCreateComponent } from './pages/orders-create/orders-create.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';

const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: 'create', component: OrdersCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdersRoutingModule { }
