import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {ListerCommercantsComponent} from './lister-commercants/lister-commercants.component';
import {CommercantsRoutingModule} from './commercants-routing.module';
import { CreerCommercantComponent } from './creer-commercant/creer-commercant.component';
import { EditCommercantComponent } from './edit-commercant/edit-commercant.component';
import { DetailCommercantComponent } from './detail-commercant/detail-commercant.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {PointsDeVenteComponent} from './points-de-vente/points-de-vente.component';
import { CreerPointDeVenteComponent } from './points-de-vente/creer-point-de-vente/creer-point-de-vente.component';
import { EditerPointDeVenteComponent } from './points-de-vente/editer-point-de-vente/editer-point-de-vente.component';
import { TerminauxComponent } from './terminaux/terminaux.component';
import { CreerTerminalComponent } from './terminaux/creer-terminal/creer-terminal.component';
import { EditerTerminalComponent } from './terminaux/editer-terminal/editer-terminal.component';
import { ConversionPointsComponent } from './conversion-points/conversion-points.component';
import { EditerConversionComponent } from './conversion-points/editer-conversion/editer-conversion.component';
import { CreerConversionComponent } from './conversion-points/creer-conversion/creer-conversion.component';
import {UtilitairesModule} from '../utilitaires/utilitaires.module';

@NgModule({
  declarations: [
    ListerCommercantsComponent,
    CreerCommercantComponent,
    EditCommercantComponent,
    DetailCommercantComponent,
    PointsDeVenteComponent,
    CreerPointDeVenteComponent,
    EditerPointDeVenteComponent,
    TerminauxComponent,
    CreerTerminalComponent,
    EditerTerminalComponent,
    ConversionPointsComponent,
    EditerConversionComponent,
    CreerConversionComponent,
  ],
  imports: [
    CommonModule,
    CommercantsRoutingModule,
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
export class CommercantsModule { }
