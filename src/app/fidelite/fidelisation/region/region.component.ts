import { Component, OnInit } from '@angular/core';
import { FidelisationService } from '../fidelisation.service';
import { Router } from '@angular/router';
import { UtilitairesService } from '../../utilitaires/utilitaires.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  listePays : any=[];
  listeRegions: any=[];
  
  constructor( private fidelisationService : FidelisationService,
               private router : Router,
               private utilitairesService : UtilitairesService) { }

  editElement(region){
    this.fidelisationService.setNewRegion(region);
    this.router.navigate(['fidelite/fidelisations/editer-region']);
  }

  addPageItem(arrayData){
    this.listeRegions =arrayData;}



  /* getALLListeRegions(){
    this.utilitairesService.getRegions().subscribe(
      (retour)=>{
        console.log("Liste des regions ******************* ", JSON.stringify(retour) );
        this.listeRegions=retour;
      },
      (err)=>{
        console.log("Erreur lors de la recuperation de la liste des régions");
      }
    )
  }
 */


  ngOnInit() {

   // this.getALLListeRegions();
  }

}