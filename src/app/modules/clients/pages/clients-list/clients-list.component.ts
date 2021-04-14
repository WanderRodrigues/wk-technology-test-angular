import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from '../../../../models/client';
import { ClientService } from '../../services/client.service';
import { ClientsListDataSource } from './clients-list-datasource';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;
  dataSource!: ClientsListDataSource;
  displayedColumns = ['id', 'document', 'birth', 'name', 'email'];

  constructor(private clientService: ClientService) {
    this.clientService.list().subscribe(list => {
      this.dataSource = new ClientsListDataSource();
      this.dataSource.data = list;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }
}
