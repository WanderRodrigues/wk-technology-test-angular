import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsCreateComponent } from './pages/clients-create/clients-create.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';

const routes: Routes = [
  { path: '', component: ClientsListComponent },
  { path: 'create', component: ClientsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientsRoutingModule { }
