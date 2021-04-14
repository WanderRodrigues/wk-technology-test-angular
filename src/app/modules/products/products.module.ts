
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ProductsCreateComponent } from './pages/products-create/products-create.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';


@NgModule({
  declarations: [
    ProductsCreateComponent, 
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ProductsModule { }
