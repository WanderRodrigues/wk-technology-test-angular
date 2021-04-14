import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/modules/products/services/product.service';

@Component({
  selector: 'app-order-add-product',
  templateUrl: './order-add-product.component.html',
  styleUrls: ['./order-add-product.component.scss']
})
export class OrderAddProductComponent implements OnInit {

  @ViewChild('product') product: any;
  products!: Observable<Product[]>;
  filteredProducts!: Observable<Product[]>;
  selected: Product[] = []
  
  constructor(
    private productService: ProductService,
    private bottomSheetRef: MatBottomSheetRef<OrderAddProductComponent>, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    this.products = this.productService.list()
  }

  change(selected: any) {
    this.selected = selected
  }

  dismiss() {
    this.bottomSheetRef.dismiss()
  }

  save() {
    this.bottomSheetRef.dismiss(this.selected);
  }
}
