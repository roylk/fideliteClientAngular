import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CommercantsService} from '../commercant.service';
import {Reponse} from '../commercant.model';
import {RequestsService} from '../../utilitaires/requests.service';

@Component({
  selector: 'app-points-de-vente',
  templateUrl: './points-de-vente.component.html',
  styleUrls: ['./points-de-vente.component.scss']
})
export class PointsDeVenteComponent implements OnInit {

  pointsDeVentes : any=[];
  reponse : Reponse;

  constructor( private router : Router,
               private requestService : RequestsService,
               private commercantsService : CommercantsService) { }

  editElement(pointsDeVente){
    this.commercantsService.setNewPointDeVente(pointsDeVente);
    this.router.navigate(['fidelite/commercants/editer-point-de-Vente']);
  }

  showElement(pointsDeVente){
    this.commercantsService.setNewPointDeVente(pointsDeVente);
    this.router.navigate(['fidelite/commercants/detail-point-de-Vente']);
  }

  addPageItem(arrayDAta){
    this.pointsDeVentes =arrayDAta;
  }
  ngOnInit(){
    this.requestService.getAllPointesDeVentes().subscribe(
      (retour)=>{
        console.log("Retour lister commercants ******************* ", JSON.stringify(retour));
        this.reponse=retour;
        if (this.reponse.status==1){
          this.pointsDeVentes=this.reponse.data;}
        else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }
}
