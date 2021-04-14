import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Order } from 'src/app/models/order';
import { OrderService } from '../../services/order.service';
import { OrdersListDataSource } from './orders-list-datasource';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Order>;
  dataSource!: OrdersListDataSource;
  displayedColumns = ['id', 'createdAt', 'name', 'products', 'total'];

  constructor(private orderService: OrderService) {
    this.orderService.list().subscribe(list => {
      this.dataSource = new OrdersListDataSource();
      this.dataSource.data = list;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }
}
