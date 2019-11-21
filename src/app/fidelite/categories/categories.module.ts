import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreerCategoriesComponent } from './creer-categories/creer-categories.component';
import { ListerCategoriesComponent } from './lister-categories/lister-categories.component';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';
import {CategoriesRoutingModule} from './categories-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {AlertModule} from 'ngx-bootstrap';
import { PolitiqueEvaluationComponent } from './politique-evaluation/politique-evaluation.component';
import { EditerPolitiqueEvaluationComponent } from './politique-evaluation/editer-politique-evaluation/editer-politique-evaluation.component';
import { CreerPolitiqueEvaluationComponent } from './politique-evaluation/creer-politique-evaluation/creer-politique-evaluation.component';
import { UtilitairesModule } from '../utilitaires/utilitaires.module';



@NgModule({
  declarations: [CreerCategoriesComponent, ListerCategoriesComponent, EditCategorieComponent, PolitiqueEvaluationComponent, EditerPolitiqueEvaluationComponent, CreerPolitiqueEvaluationComponent],
  imports: [
    CategoriesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    AlertModule.forRoot(),
    UtilitairesModule,
  ]
})
export class CategoriesModule { }
