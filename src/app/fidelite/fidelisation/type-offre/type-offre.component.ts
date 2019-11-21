import { Component, OnInit } from '@angular/core';
import {FidelisationService} from '../fidelisation.service';
import {Router} from '@angular/router';
import {RequestsService} from '../../utilitaires/requests.service';
import {Reponse} from '../fidelisation.model';

@Component({
  selector: 'app-type-offre',
  templateUrl: './type-offre.component.html',
  styleUrls: ['./type-offre.component.scss']
})
export class TypeOffreComponent implements OnInit {

  reponse :  Reponse;
  typeOffres : any=[];
  constructor(private fidelisationService : FidelisationService,
              private router : Router,
              private requestsService : RequestsService) { }


  editElement(type_offre){
    this.fidelisationService.setNewTypeOffre(type_offre);
    this.router.navigate(['fidelite/fidelisations/editer-type-offre']);
  }

  ngOnInit() {

    this.requestsService.getAllTypeoffres().subscribe(
      (catRep)=>{
        console.log("Retour lister les types d'offres ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.typeOffres=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

}
