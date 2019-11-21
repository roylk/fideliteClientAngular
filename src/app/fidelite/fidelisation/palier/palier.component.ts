import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FidelisationService} from '../fidelisation.service';
import {RequestsService} from '../../utilitaires/requests.service';
import {Reponse} from '../fidelisation.model';

@Component({
  selector: 'app-palier',
  templateUrl: './palier.component.html',
  styleUrls: ['./palier.component.scss']
})
export class PalierComponent implements OnInit {

  reponse : Reponse;
  paliers : any=[];

  constructor( private router : Router, private fidelisationService : FidelisationService, private requestsService : RequestsService) {}

  editElement(palier){
    this.fidelisationService.setNewPalier(palier);
    this.router.navigate(['fidelite/fidelisations/editer-palier']);
  }

  addPageItem(arrayData){
    this.paliers =arrayData;}

  ngOnInit() {

    this.requestsService.getAllPaliers().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.paliers=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

}
