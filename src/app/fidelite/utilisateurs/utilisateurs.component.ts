import { Component, OnInit } from '@angular/core';
import { Reponse } from '../fidelisation/fidelisation.model';
import { FidelisationService } from '../fidelisation/fidelisation.service';
import { Router } from '@angular/router';
import { RequestsService } from '../utilitaires/requests.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  users : any =[];
  reponse : Reponse;

  constructor( private fidelisationService : FidelisationService, private router : Router, private requestsService : RequestsService) {}

  editElement(utilisateur){
    this.fidelisationService.setNewoffre(utilisateur);
    this.router.navigate(['fidelite/editer-utilisateur']);
  }

  addPageItem(arrayData){
    this.users =arrayData;}

  ngOnInit() {

    this.requestsService.getAllUsers().subscribe(
      (catRep)=>{
        console.log("Retour lister les utilisateurs ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.users=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });

  }
}
