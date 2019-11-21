import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { ClientMirror, PaysMirror, VilleMirror, RegionMirror, Reponse } from '../client.model';
import { UtilitairesService } from '../../utilitaires/utilitaires.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-lister-clients',
  templateUrl: './lister-clients.component.html',
  styleUrls: ['./lister-clients.component.scss']
})
export class ListerClientsComponent implements OnInit {
  clients: ClientMirror[];
  pays: PaysMirror[];
  regions: RegionMirror[];
  reponse: Reponse;
  pageNumber : number = 0;
  arrayData : any=[];

  constructor(private clientsServices: ClientsService, private utilitairesService:UtilitairesService, private router : Router) { }

  delete(code:string){
    console.log(" appel de la liste des region du pays *******************************************  ", code)
      this.clientsServices.deleteClient(code).subscribe(
        (retour)=>{
          console.log("objet supprimé  ", JSON.stringify(retour));
          console.log("Nouvelle valeurs du tableau ===================================== ", this.clients);
          let clientArray = this.clients;
          this.clients = _.remove(clientArray, function(e){
              return  e.code !== code
          })
          console.log("Nouvelle valeurs du tableau ************************** ", this.clients);
        },
        (err)=>{
          console.log(" Erreur ", err);
        },

        //this.route.navigate([['']['lister-clients']]);
      
      )}

   editElement(client){
     this.clientsServices.setNewClient(client);
     this.router.navigate(['fidelite/clients/edit-client']);
   }

  showElement(client){
    this.clientsServices.setNewClient(client);
    this.router.navigate(['fidelite/clients/detail-clients']);
  }

  addPageItem(arrayData: any[]) {
    console.log(" test de donnee recu******************************************************************************************  "+  JSON.stringify(arrayData));
     this.arrayData = arrayData ;
  }

  ngOnInit() {}

}
