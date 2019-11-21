import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListerCommercantsComponent} from './lister-commercants/lister-commercants.component';
import {CreerCommercantComponent} from './creer-commercant/creer-commercant.component';
import { EditCommercantComponent } from './edit-commercant/edit-commercant.component';
import { DetailCommercantComponent } from './detail-commercant/detail-commercant.component';
import {PointsDeVenteComponent} from './points-de-vente/points-de-vente.component';
import {CreerPointDeVenteComponent} from './points-de-vente/creer-point-de-vente/creer-point-de-vente.component';
import {EditerPointDeVenteComponent} from './points-de-vente/editer-point-de-vente/editer-point-de-vente.component';
import {TerminauxComponent} from './terminaux/terminaux.component';
import {CreerTerminalComponent} from './terminaux/creer-terminal/creer-terminal.component';
import {EditerTerminalComponent} from './terminaux/editer-terminal/editer-terminal.component';
import {ConversionPointsComponent} from './conversion-points/conversion-points.component';
import {CreerConversionComponent} from './conversion-points/creer-conversion/creer-conversion.component';
import {EditerConversionComponent} from './conversion-points/editer-conversion/editer-conversion.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'lister-commercants'
  },
  {
    path: 'lister-commercants',
    component: ListerCommercantsComponent,
    data: {
      title: 'Lister-commercants'
    }
  },
  {
    path: 'creer-commercant',
    component: CreerCommercantComponent,
    data: {
      title: 'Creer-commercant'
    }
  },
  {
    path: 'edit-commercant',
    component: EditCommercantComponent,
    data: {
      title: 'Edit-commercant'
    }
  },
  {
    path: 'lister-points-de-vente',
    component: PointsDeVenteComponent,
    data: {
      title: 'Lister-points-de-vente'
    }
  },
  {
    path: 'creer-point-de-vente',
    component: CreerPointDeVenteComponent,
    data: {
      title: 'Creer-point-de-vente'
    }
  },
  {
    path: 'editer-point-de-Vente',
    component: EditerPointDeVenteComponent,
    data: {
      title: 'Editer-point-de-vente'
    }
  },
   {
    path: 'lister-terminaux',
    component: TerminauxComponent,
    data: {
      title: 'Lister-terminaux'
    }
   },
  {
    path: 'creer-terminal',
    component: CreerTerminalComponent,
    data: {
      title: 'Creer-terminal'
    }
   },
  {
    path: 'editer-terminal',
    component: EditerTerminalComponent,
    data: {
      title: 'Editer-terminal'
    }
   },
  {
    path: 'detail-commercant',
    component: DetailCommercantComponent,
    data: {
      title: 'Detail-commercant'
    }
  },
  {
    path: 'lister-conversions',
    component: ConversionPointsComponent,
    data: {
      title: 'Lister-conversions'
    }
  },
  {
    path: 'creer-conversion',
    component: CreerConversionComponent,
    data: {
      title: 'Creer-conversion'
    }
  },

  {
    path: 'editer-conversion',
    component: EditerConversionComponent,
    data: {
      title: 'Editer-conversion'
    }
  },


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercantsRoutingModule { }
