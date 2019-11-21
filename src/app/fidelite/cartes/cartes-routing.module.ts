import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListerCartesComponent} from './lister-cartes/lister-cartes.component';
import {CreerCarteComponent} from './creer-carte/creer-carte.component';
import { EditCarteComponent } from './edit-carte/edit-carte.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'lister-cartes'
  },
  {
    path: 'lister-cartes',
    component: ListerCartesComponent,
    data: {
      title: 'Lister-cartes'
    }
  },
  {
    path: 'creer-carte',
    component: CreerCarteComponent,
    data: {
      title: 'Creer-carte'
    }
  },
  {
    path: 'edit-carte',
    component: EditCarteComponent,
    data: {
      title: 'Edit-carte'
    }
  },

  {
    path: 'lister-transactions',
    component: TransactionsComponent,
    data: {
      title: 'Lister-transactions'
    }
   },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartesRoutingModule { }
