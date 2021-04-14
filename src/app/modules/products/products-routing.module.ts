import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCreateComponent } from './pages/products-create/products-create.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'create', component: ProductsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule { }
