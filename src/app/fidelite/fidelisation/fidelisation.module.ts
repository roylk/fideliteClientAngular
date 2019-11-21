import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FidelisationRoutingModule} from './fidelisation-routing.module';
import { OffresComponent } from './offres/offres.component';
import { CreerOffreComponent } from './offres/creer-offre/creer-offre.component';
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
import { EditerOffreComponent } from './offres/editer-offre/editer-offre.component';
import { PalierComponent } from './palier/palier.component';
import { CreerPalierComponent } from './palier/creer-palier/creer-palier.component';
import { EditerPalierComponent } from './palier/editer-palier/editer-palier.component';
import { TypeOffreComponent } from './type-offre/type-offre.component';
import { CreerTypeOffreComponent } from './type-offre/creer-type-offre/creer-type-offre.component';
import { EditerTypeOffreComponent } from './type-offre/editer-type-offre/editer-type-offre.component';
import { PaysComponent } from './pays/pays.component';
import { CreerPaysComponent } from './pays/creer-pays/creer-pays.component';
import { EditerPaysComponent } from './pays/editer-pays/editer-pays.component';
import { RegionComponent } from './region/region.component';
import { CreerRegionComponent } from './region/creer-region/creer-region.component';
import { EditerRegionComponent } from './region/editer-region/editer-region.component';
import { VilleComponent } from './ville/ville.component';
import { CreerVilleComponent } from './ville/creer-ville/creer-ville.component';
import { EditerVilleComponent } from './ville/editer-ville/editer-ville.component';
import { UtilitairesModule } from '../utilitaires/utilitaires.module';


@NgModule({
  declarations: [OffresComponent, CreerOffreComponent, EditerOffreComponent, PalierComponent, CreerPalierComponent, EditerPalierComponent, TypeOffreComponent, CreerTypeOffreComponent, EditerTypeOffreComponent, PaysComponent, CreerPaysComponent, EditerPaysComponent, RegionComponent, CreerRegionComponent, EditerRegionComponent, VilleComponent, CreerVilleComponent, EditerVilleComponent],
  imports: [
    CommonModule,
    FidelisationRoutingModule,
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
    UtilitairesModule
   
  ]
})
export class FidelisationModule { }
