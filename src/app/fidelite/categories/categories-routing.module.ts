import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListerCategoriesComponent} from './lister-categories/lister-categories.component';
import {CreerCategoriesComponent} from './creer-categories/creer-categories.component';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';
import {PolitiqueEvaluationComponent} from './politique-evaluation/politique-evaluation.component';
import {CreerPolitiqueEvaluationComponent} from './politique-evaluation/creer-politique-evaluation/creer-politique-evaluation.component';
import {EditerPolitiqueEvaluationComponent} from './politique-evaluation/editer-politique-evaluation/editer-politique-evaluation.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'lister-categories'
  },
  {
    path: 'lister-categories',
    component: ListerCategoriesComponent,
    data: {
      title: 'Lister-categories'
    }
  },
  {
    path: 'creer-categorie',
    component: CreerCategoriesComponent,
    data: {
      title: 'Creer-categorie'
    }
  },
  {
    path: 'edit-categorie',
    component: EditCategorieComponent,
    data: {
      title: 'Edit-categorie'
    }
  },
  {
    path: 'lister-politiques',
    component: PolitiqueEvaluationComponent,
    data: {
      title: 'Lister-politiques'
    }
  },
  {
    path: 'creer-politique',
    component: CreerPolitiqueEvaluationComponent,
    data: {
      title: 'Creer-politique'
    }
  },
  {
    path: 'editer-politique',
    component: EditerPolitiqueEvaluationComponent,
    data: {
      title: 'Editer-politique'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
