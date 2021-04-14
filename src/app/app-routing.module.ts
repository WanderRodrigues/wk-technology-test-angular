import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsModule } from './modules/clients/clients.module';
import { ProductsModule } from './modules/products/products.module';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', redirectTo: 'clients', pathMatch: 'prefix' },
    { path: 'clients', loadChildren: () => ClientsModule },
    { path: 'products', loadChildren: () => ProductsModule },
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }