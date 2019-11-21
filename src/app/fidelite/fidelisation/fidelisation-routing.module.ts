import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OffresComponent} from './offres/offres.component';
import {CreerOffreComponent} from './offres/creer-offre/creer-offre.component';
import {EditerOffreComponent} from './offres/editer-offre/editer-offre.component';
import {PalierComponent} from './palier/palier.component';
import {CreerPalierComponent} from './palier/creer-palier/creer-palier.component';
import {EditerPalierComponent} from './palier/editer-palier/editer-palier.component';
import {TypeOffreComponent} from './type-offre/type-offre.component';
import {CreerTypeOffreComponent} from './type-offre/creer-type-offre/creer-type-offre.component';
import {EditerTypeOffreComponent} from './type-offre/editer-type-offre/editer-type-offre.component';
import {PaysComponent} from './pays/pays.component';
import {RegionComponent} from './region/region.component';
import {VilleComponent} from './ville/ville.component';
import {CreerPaysComponent} from './pays/creer-pays/creer-pays.component';
import {EditerPaysComponent} from './pays/editer-pays/editer-pays.component';
import { CreerRegionComponent } from './region/creer-region/creer-region.component';
import { EditerRegionComponent } from './region/editer-region/editer-region.component';
import { EditerVilleComponent } from './ville/editer-ville/editer-ville.component';
import { CreerVilleComponent } from './ville/creer-ville/creer-ville.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'lister-offres'
  },
  {
    path: 'lister-offres',
    component: OffresComponent,
    data: {
      title: 'Lister-offres'
    }
  },
  {
    path: 'creer-offre',
    component: CreerOffreComponent,
    data: {
      title: 'creer-offre'
    }
  },
  {
    path: 'editer-offre',
    component: EditerOffreComponent,
    data: {
      title: 'editer-offre'
    }
  },
  {
    path: 'lister-paliers',
    component: PalierComponent,
    data: {
      title: 'Lister les paliers'
    }
  },
  {
    path: 'creer-palier',
    component: CreerPalierComponent,
    data: {
      title: 'Creer un palier'
    }
  },
  {
    path: 'editer-palier',
    component: EditerPalierComponent,
    data: {
      title: 'Editer un palier'
    }
  },
  {
    path: 'lister-type-offres',
    component: TypeOffreComponent,
    data: {
      title: 'Lister les  types d\'offre '
    }
  },
  {
    path: 'creer-type-offre',
    component: CreerTypeOffreComponent,
    data: {
      title: 'Creer un type d\'offre'
    }
  },
  {
    path: 'editer-type-offre',
    component: EditerTypeOffreComponent,
    data: {
      title: 'Editer un type d\'offre'
    }
  },
  {
    path: 'lister-pays',
    component: PaysComponent,
    data: {
      title: 'Liste des pays'
    }
  },
  {
    path: 'creer-pays',
    component: CreerPaysComponent,
    data: {
      title: 'Editer un pays'
    }
  },
  {
    path: 'editer-pays',
    component: EditerPaysComponent,
    data: {
      title: 'Editer un pays'
    }
  },
  {
    path: 'lister-regions',
    component: RegionComponent,
    data: {
      title: 'Liste des régions'
    }
  },

  {
    path: 'lister-villes',
    component: VilleComponent,
    data: {
      title: 'Liste des villes'
    }
  },
  {
    path: 'creer-payer',
    component: CreerPaysComponent,
    data: {
      title: 'Création des pays'
    }
  },
  {
    path: 'creer-region',
    component: CreerRegionComponent,
    data: {
      title: 'Création des régions'
    }  
  },
  {
    path: 'editer-region',
    component: EditerRegionComponent,
    data: {
      title: 'Modification  des régions'
    }  
  },

  {
    path: 'editer-ville',
    component: EditerVilleComponent,
    data: {
      title: 'Modification des villes'
    }  
  },
  {
    path: 'creer-ville',
    component: CreerVilleComponent,
    data: {
      title: 'Création des villes'
    }  
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FidelisationRoutingModule { }
