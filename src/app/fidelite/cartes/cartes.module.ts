import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListerCartesComponent } from './lister-cartes/lister-cartes.component';
import { EditCarteComponent } from './edit-carte/edit-carte.component';
import { CreerCarteComponent } from './creer-carte/creer-carte.component';
import {CartesRoutingModule} from './cartes-routing.module';
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
import { UtilitairesModule } from '../utilitaires/utilitaires.module';
import { TransactionsComponent } from './transactions/transactions.component';



@NgModule({
  declarations: [ListerCartesComponent, EditCarteComponent, CreerCarteComponent, TransactionsComponent],
  imports: [
    CommonModule,
    CartesRoutingModule,
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
    UtilitairesModule
  ]
})
export class CartesModule { }
