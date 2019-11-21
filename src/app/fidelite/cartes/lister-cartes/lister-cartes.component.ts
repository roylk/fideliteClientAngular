import { Component, OnInit } from '@angular/core';

import {CartesService} from '../cartes.service';
import {Reponse} from '../carte.model'
import {RequestsService} from '../../utilitaires/requests.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lister-cartes',
  templateUrl: './lister-cartes.component.html',
  styleUrls: ['./lister-cartes.component.scss']
})
export class ListerCartesComponent implements OnInit {

  cartes : any;
  reponse : Reponse;
  arrayData: any=[];

  constructor( private cartesServices : CartesService, private router : Router, private requestsService : RequestsService) { }

  editElement(carte){
    this.cartesServices.setNewCarte(carte);
    this.router.navigate(['fidelite/cartes/edit-carte']);
  }


  getCardslist(){
    this.requestsService.getAllCartes().subscribe(
      (retour)=>{
        this.reponse=retour;
        console.log("Retour Serveur pour le listing des cartes  ", retour);
        if (this.reponse.status==1){
          this.cartes=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
      },
      (err)=>{
        console.log("Erreur lors de la recuperation de la carte");
      }
    )
  }

  addPageItem(arrayData: any[]) {
    console.log(" test de donnee recu******************************************************************************************  "+  JSON.stringify(arrayData));
    this.arrayData=arrayData;
  }

  ngOnInit() {

    this.getCardslist();
  }


}
