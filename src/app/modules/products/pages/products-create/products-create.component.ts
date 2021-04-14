import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent {

  form = this.fb.group({
    name: [null, Validators.required],
    value: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router) {
  }

  async create() {
    try {
      const { name, value } = this.form.value
      const model: Product = {
        id: null,
        name: name,
        value: value*1
      }
      await this.productService.create(model)
      this.router.navigate(['/products'])
    } catch (error) {
      alert(error);
    }
  }
}
