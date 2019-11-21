import { Component, OnInit } from '@angular/core';
import {Reponse} from '../commercant.model';
import {Router} from '@angular/router';
import {RequestsService} from '../../utilitaires/requests.service';
import {CommercantsService} from '../commercant.service';

@Component({
  selector: 'app-conversion-points',
  templateUrl: './conversion-points.component.html',
  styleUrls: ['./conversion-points.component.scss']
})
export class ConversionPointsComponent implements OnInit {

  conversions : any;
  reponse : Reponse;

  constructor( private router : Router,
               private requestService : RequestsService,
               private commercantsService : CommercantsService) { }


  editElement(conversion){
    this.commercantsService.setNewConversion(conversion);
    this.router.navigate(['fidelite/commercants/editer-conversion']);
  }

  getAllConversions(){
    this.requestService.getAllConversions().subscribe(
      (retour)=>{
        console.log("Retour lister commercants ******************* ", JSON.stringify(retour));
        this.reponse=retour;
        if (this.reponse.status==1){
          this.conversions=this.reponse.data;}
        else{
          console.log("Erreur...........,", this.reponse.message)
        }
      },
      (err)=>{
        console.log('Erreur lors de la recuperation des conversions ');
      });
  }

  ngOnInit(){

    //recuperation de toute les conversions des points commercants
    this.getAllConversions();
  }

}
