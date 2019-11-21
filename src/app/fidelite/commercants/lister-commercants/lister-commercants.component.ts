import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CommercantsService } from '../commercant.service';
import { CommercantMirror, PaysMirror, VilleMirror, RegionMirror, Reponse } from '../commercant.model';
import { UtilitairesService } from '../../utilitaires/utilitaires.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import {RequestsService} from '../../utilitaires/requests.service';

@Component({
  selector: 'app-lister-commercants',
  templateUrl: './lister-commercants.component.html',
  styleUrls: ['./lister-commercants.component.scss']
})
export class ListerCommercantsComponent implements OnInit {
  //displayedColumns: string[] = ['code','titre', 'nom', 'prenom', 'dateNaissance','telephone1','telephone2', 'adresse','email','pays','region','ville','statut','action'];
  //dataSource = new MatTableDataSource([]);
  commercants: CommercantMirror[];
  villes: VilleMirror[];
  pays: PaysMirror[];
  regions: RegionMirror[];
  reponse: Reponse;
  arrayData : any=[];

  constructor(private commercantsService: CommercantsService,
              private utilitairesService:UtilitairesService,
              private router : Router,
              private requestService : RequestsService) { }

  delete(code:string){
    console.log(" appel de la liste des region du pays *******************************************  ", code);
      this.commercantsService.deleteCommercant(code).subscribe(
        (retour)=>{
          console.log("objet supprimé  ", JSON.stringify(retour));
          console.log("Nouvelle valeurs du tableau ===================================== ", this.commercants);
          let clientArray = this.commercants;
          this.commercants = _.remove(clientArray, function(e){
              return  e.code !== code
          })
          console.log("Nouvelle valeurs du tableau ************************** ", this.commercants);
        },
        (err)=>{
          console.log(" Erreur ", err);
        },

        //this.route.navigate([['']['lister-commercants']]);
      
      )}

      editElement(commercants){
        this.commercantsService.setNewCommercant(commercants);
        this.router.navigate(['fidelite/commercants/edit-commercant']);
      }

      showElement(commercants){
        this.commercantsService.setNewCommercant(commercants);
        this.router.navigate(['fidelite/commercants/detail-commercant']);

      }

  addPageItem(arrayData: any[]) {
    this.arrayData=arrayData;
  }

  ngOnInit() {

    this.requestService.getAllCommercants().subscribe(
      (commercantsRep)=>{
        console.log("Retour lister commercants ******************* ", JSON.stringify(commercantsRep));
        this.reponse=commercantsRep;
        if (this.reponse.status==1){
          this.commercants=this.reponse.data;}
        else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
    });
   
    
  }

}
