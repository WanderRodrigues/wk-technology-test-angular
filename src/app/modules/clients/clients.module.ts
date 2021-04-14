import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsCreateComponent } from './pages/clients-create/clients-create.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { CepModule } from '../cep/cep.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ClientsCreateComponent, 
    ClientsListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CepModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ClientsModule { }
