import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { Client } from 'src/app/models/client';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { ClientService } from 'src/app/modules/clients/services/client.service';
import { OrderAddProductComponent } from '../../components/order-add-product/order-add-product.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-create',
  templateUrl: './orders-create.component.html',
  styleUrls: ['./orders-create.component.scss'],
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
export class OrdersCreateComponent {
  
  clientControl = new FormControl();
  form = this.fb.group({
    client: [null],
    products: [[], Validators.required],
    total: [null, Validators.required],
  });
  clients: Client[] = [];
  filteredOptions!: Observable<Client[]>;

  constructor(
    private fb: FormBuilder, 
    private orderService: OrderService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private clientService: ClientService,
    private bottomSheet: MatBottomSheet,
  ) {}

  async ngOnInit() {
    this.dateAdapter.setLocale('pt-BR')
    this.clients = await this.clientService.list().pipe(first()).toPromise();
    this.filteredOptions = this.clientControl.valueChanges.pipe(startWith(''),map(value => this._filterClient(value)))
  }

  async create() {
    try {
      const { client, products, total } = this.form.value
      const model: Order = {
        id: null,
        client: client,
        products: products,
        total: total,
        createdAt: new Date()
      }
      await this.orderService.create(model)
      this.router.navigate(['/orders'])
    } catch (error) {
      alert(error)
    }
  }

  selectedClient(name: string): Client {
    return this.clients.filter(client => client.name == name)[0];
  }

  private _filterClient(value: string): Client[] {
    const filterValue = value.toLowerCase();
    this.form.controls['client'].setValue(this.selectedClient(value));
    return this.clients.filter(client => client.name.toLowerCase().includes(filterValue));
  }

  addProducts() {
    const { products, total } = this.form.value
    this.bottomSheet.open(OrderAddProductComponent).afterDismissed().subscribe(data => {
      products.push(...data)
      this.form.controls['products'].setValue(products);
      this.form.controls['total'].setValue(products.map((product: Product) => product.value).reduce(function(acumulador: number, valorAtual: number) {
        return acumulador + valorAtual;
      }))
    });
  }
}
