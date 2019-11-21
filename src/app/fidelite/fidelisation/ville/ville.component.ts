import { Component, OnInit } from '@angular/core';
import { FidelisationService } from '../fidelisation.service';
import { Router } from '@angular/router';
import { UtilitairesService } from '../../utilitaires/utilitaires.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss']
})
export class VilleComponent implements OnInit {

  listePays : any=[];
  listeRegions: any=[];
  listeVilles: any=[];
  
  constructor( private fidelisationService : FidelisationService,
               private router : Router,
               private utilitairesService : UtilitairesService) { }

  editElement(ville){
    this.fidelisationService.setNewVille(ville);
    this.router.navigate(['fidelite/fidelisations/editer-ville']);
  }

  addPageItem(arrayData){
    this.listeVilles =arrayData;}

 /*  getALLListeVilles(){
    this.utilitairesService.getVilles().subscribe(
      (retour)=>{
        console.log("Liste des villes ******************* ", JSON.stringify(retour) );
        this.listeVilles=retour;
      },
      (err)=>{
        console.log("Erreur lors de la recuperation de la liste des villes");
      }
    )
  }
 */


  ngOnInit() {

    //this.getALLListeVilles();
  }

}
