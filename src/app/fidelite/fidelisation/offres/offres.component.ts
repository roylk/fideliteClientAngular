import { Component, OnInit } from '@angular/core';
import {FidelisationService} from '../fidelisation.service';
import {Router} from '@angular/router';
import {RequestsService} from '../../utilitaires/requests.service';
import {Reponse} from '../fidelisation.model';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.scss']
})
export class OffresComponent implements OnInit {

  offres : any =[];
  reponse : Reponse;

  constructor( private fidelisationService : FidelisationService, private router : Router, private requestsService : RequestsService) {}

  editElement(offre){
    this.fidelisationService.setNewoffre(offre);
    this.router.navigate(['fidelite/fidelisations/editer-offre']);
  }

  addPageItem(arrayData){
    this.offres =arrayData;}

  ngOnInit() {

    this.requestsService.getAllOffres().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.offres=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });

  }

}
