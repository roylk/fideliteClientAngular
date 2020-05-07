import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransactionMirror, Reponse } from '../carte.model';
import { CartesService } from '../cartes.service';
import { RequestsService } from '../../utilitaires/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions : any=[];
  reponse : Reponse;
  

  constructor( private router : Router,
               private requestService : RequestsService,
               private cartesService : CartesService) { }


   /*  addPageItem(arrayData){
        this.transactions =arrayData;
    } */

  getTransactionList(){

    this.requestService.getAllTransactions().subscribe(
      (retour)=>{
        console.log("Retour lister transactions ******************* ", JSON.stringify(retour));
        this.reponse=retour;
        if (this.reponse.status==1){
          this.transactions=this.reponse.data;}
        else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });

  }

  refresh(){
    this.getTransactionList();
  }

  ngOnInit() {

    this.getTransactionList();

    /* this.requestService.getAllTransactions().subscribe(
      (retour)=>{
        console.log("Retour lister transactions ******************* ", JSON.stringify(retour));
        this.reponse=retour;
        if (this.reponse.status==1){
          this.transactions=this.reponse.data;}
        else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      }); */
  }
  

}
