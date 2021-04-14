import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersCreateComponent } from './pages/orders-create/orders-create.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaskModule } from 'ngx-mask';
import { OrderAddProductComponent } from './components/order-add-product/order-add-product.component';

@NgModule({
  declarations: [
    OrdersCreateComponent, 
    OrdersListComponent,
    OrderAddProductComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(),
  ],
  entryComponents: [
    OrderAddProductComponent
  ]
})
export class OrdersModule { }
