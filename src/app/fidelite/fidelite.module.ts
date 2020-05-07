import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './dashboard/accueil.component';
import { FideliteRoutingModule } from './fidelite-routing/fidelite-routing.module';
import {FideliteComponent} from './fidelite.component';
import { AutoRefreshComponent } from './auto-refresh/auto-refresh.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { CreerUtilisateurComponent } from './utilisateurs/creer-utilisateur/creer-utilisateur.component';
import { EditerUtilisateurComponent } from './utilisateurs/editer-utilisateur/editer-utilisateur.component';
import { UtilitairesModule } from './utilitaires/utilitaires.module';



@NgModule({
  declarations: [
    AccueilComponent,
    FideliteComponent,
    UtilisateursComponent,
    CreerUtilisateurComponent,
    EditerUtilisateurComponent,    
   
  ],
  imports: [
    CommonModule,
    FideliteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UtilitairesModule,
    
  ],

})
export class FideliteModule { }
