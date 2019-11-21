import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './dashboard/accueil.component';
import { FideliteRoutingModule } from './fidelite-routing/fidelite-routing.module';
import {FideliteComponent} from './fidelite.component';



@NgModule({
  declarations: [
    AccueilComponent,
    FideliteComponent
  ],
  imports: [
    CommonModule,
    FideliteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],

})
export class FideliteModule { }
