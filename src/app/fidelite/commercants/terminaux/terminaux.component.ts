import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RequestsService} from '../../utilitaires/requests.service';
import {CommercantsService} from '../commercant.service';
import {Reponse} from '../commercant.model';

@Component({
  selector: 'app-terminaux',
  templateUrl: './terminaux.component.html',
  styleUrls: ['./terminaux.component.scss']
})
export class TerminauxComponent implements OnInit {

  terminaux : any=[];
  //terminaux:any;
  reponse : Reponse;

  constructor( private router : Router,
               private requestService : RequestsService,
               private commercantsService : CommercantsService) { }


  editElement(terminal){
    this.commercantsService.setNewTerminal(terminal);
    this.router.navigate(['fidelite/commercants/editer-terminal']);
  }

  showElement(terminal){
    this.commercantsService.setNewTerminal(terminal);
    this.router.navigate(['fidelite/commercants/detail-terminal']);
  }

  addPageItem(arrayData){
    this.terminaux =arrayData;}

  ngOnInit() {

    this.requestService.getAllTerminaux().subscribe(
      (retour)=>{
        console.log("Retour lister commercants ******************* ", JSON.stringify(retour));
        this.reponse=retour;
        if (this.reponse.status==1){
          this.terminaux=this.reponse.data;}
        else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

}
