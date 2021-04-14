import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CepService } from './services/cep.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    CepService
  ]
})
export class CepModule { }
