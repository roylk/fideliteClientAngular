import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListerClientsComponent} from './lister-clients/lister-clients.component';
import {CreerClientsComponent} from './creer-clients/creer-clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DetailClientsComponent } from './detail-clients/detail-clients.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'lister-clients'
  },
  {
    path: 'lister-clients',
    component: ListerClientsComponent,
    data: {
      title: 'Lister-clients'
    }
  },
  {
    path: 'creer-clients',
    component: CreerClientsComponent,
    data: {
      title: 'Creer-clients'
    }
  },
  {
    path: 'edit-client',
    component: EditClientComponent,
    data: {
      title: 'Edit-client'
    }
  },

  {
    path: 'detail-clients',
    component: DetailClientsComponent,
    data: {
      title: 'Detail-Clients'
    }
  },


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
