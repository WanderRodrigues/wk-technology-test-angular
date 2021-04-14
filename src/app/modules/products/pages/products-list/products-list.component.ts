import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';
import { ProductsListDataSource } from './products-list-datasource';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource!: ProductsListDataSource;
  displayedColumns = ['id', 'name', 'value'];

  constructor(private productService: ProductService) {
    this.productService.list().subscribe(list => {
      this.dataSource = new ProductsListDataSource();
      this.dataSource.data = list;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }
}
