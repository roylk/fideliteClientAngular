import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from '../dashboard/accueil.component';
import {FideliteComponent} from '../fidelite.component';
import { AuthGuardGuard } from '../utilitaires/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Fidelite',
      canActivate: [AuthGuardGuard]
    },
    children: [
      {
        path: '',
        redirectTo: 'accueil'
      },
      {
        path: 'accueil',
        component: AccueilComponent,
        data: {
          title: 'Accueil'
        }
      },
      {
        path: 'clients',
        component : FideliteComponent,
        data: {
          title: ''
        },
        children: [
          {
            path: '',
            loadChildren: () => import('../clients/clients.module').then(m => m.ClientsModule)
          }
        ]
      },
      {
        path: 'commercants',
        component : FideliteComponent,
        data: {
          title: ''
        },
        children: [
          {
            path: '',
            loadChildren: () => import('../commercants/commercants.module').then(m => m.CommercantsModule)
          }
        ]
      },
      {
        path: 'categories',
        component : FideliteComponent,
        data: {
          title: ''
        },
        children: [
          {
            path: '',
            loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule)
          }
        ]
      },
      {
        path: 'cartes',
        component : FideliteComponent,
        data: {
          title: ''
        },
        children: [
          {
            path: '',
            loadChildren: () => import('../cartes/cartes.module').then(m => m.CartesModule)
          }
        ]
      },
      {
        path: 'fidelisations',
        component : FideliteComponent,
        data: {
          title: ''
        },
        children: [
          {
            path: '',
            loadChildren: () => import('../fidelisation/fidelisation.module').then(m => m.FidelisationModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FideliteRoutingModule { }
