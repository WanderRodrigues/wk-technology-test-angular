import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CepService } from '../../../../modules/cep/services/cep.service';
import { Client } from '../../../../models/client';
import { ClientService } from '../../services/client.service';
import { first } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import localePt from '@angular/common/locales/pt';
import * as moment from 'moment';
registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients-create.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ],
})
export class ClientsCreateComponent {

  form = this.fb.group({
    name: null,
    document: [null, Validators.required],
    birth: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    postCode: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
    street: null,
    number: [null, Validators.required],
    complement: [null, Validators.required],
    neighborhood: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required]
  });
  cep: any = null

  constructor(
    private fb: FormBuilder, 
    private clientService: ClientService,
    private router: Router, 
    private cepService: CepService,
    private dateAdapter: DateAdapter<Date>) {
   }

   ngOnInit() {
    this.dateAdapter.setLocale('pt-BR')
    this.form.controls['postCode'].valueChanges.subscribe(async (value: string) => {
      if(value.length >= 8){
        const { logradouro, bairro, uf, localidade } = await this.cepService.get(value).pipe(first()).toPromise()
        this.cep = { logradouro, bairro, uf, localidade }
        this.form.controls['street'].setValue(logradouro)
        this.form.controls['neighborhood'].setValue(bairro)
        this.form.controls['city'].setValue(localidade)
        this.form.controls['state'].setValue(uf)
      }
    })
  }
  async create() {
    try {
      const { name, document, birth, email, postCode, city, neighborhood, number, street, complement } = this.form.value
      const model: Client = {
        id: null,
        name: name,
        document: document,
        birth: moment(birth).toDate(),
        email: email,
        address: {
          postCode: postCode,
          city: city,
          neighborhood: neighborhood,
          number: number,
          street: street,
          complement: complement
        }
      }
      await this.clientService.create(model)
      this.router.navigate(['/clients'])
    } catch (error) {
      alert(error);
    }
  }
}
