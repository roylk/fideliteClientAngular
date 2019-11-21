import { Component, OnInit } from '@angular/core';
import {FidelisationService} from '../fidelisation.service';
import {Router} from '@angular/router';
import {UtilitairesService} from '../../utilitaires/utilitaires.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit {

  listePays : any=[];

  constructor( private fidelisationService : FidelisationService,
               private router : Router,
               private utilitairesService : UtilitairesService) { }

  editElement(pays){
    this.fidelisationService.setNewPays(pays);
    this.router.navigate(['fidelite/fidelisations/editer-pays']);
  }

  addPageItem(arrayData){
    this.listePays =arrayData;}



  /* getALLListePays(){
    this.utilitairesService.getPays().subscribe(
      (retour)=>{
        console.log("Liste des pays ******************* ", JSON.stringify(retour) );
        this.listePays=retour;
      },
      (err)=>{
        console.log("Erreur lors de la recuperation de la liste des pays");
      }
    )
  }
 */


  ngOnInit() {

    //this.getALLListePays();
  }

}
