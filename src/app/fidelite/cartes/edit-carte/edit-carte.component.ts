import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarteMirror, Reponse} from '../carte.model';
import {Router} from '@angular/router';
import {CartesService} from '../cartes.service';
import {RequestsService} from '../../utilitaires/requests.service';

@Component({
  selector: 'app-edit-carte',
  templateUrl: './edit-carte.component.html',
  styleUrls: ['./edit-carte.component.scss']
})
export class EditCarteComponent implements OnInit {

  errBack : boolean=false;
  msgError : any;

  editCustomerForm : FormGroup;
  submitted : boolean=true;

  carte : any;
  carteMirror : CarteMirror;
  reponse : Reponse;

  categories :  any;
  clients :  any;

  constructor( private fb: FormBuilder, private router : Router,  private cartesService : CartesService, private requestsService : RequestsService) {}

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  /**** mise à jour d'un client***/
  initEditCustomerForm(carte){//initialisation
    if(carte){
      this.editCustomerForm = this.fb.group({
        numero: [carte.numero, Validators.required],
        compteurPoint: [carte.compteurPoint],
        montantAcumule:[carte.montantAcumule],
        nombreTransaction:[carte.nombreTransaction],
        statut:[carte.statut, Validators.required],
        categorieCarte:[carte.categorieCarte.code, Validators.required],
        client: [carte.client.code],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        numero: ['', Validators.required],
        compteurPoint: [0],
        montantAcumule:[0],
        nombreTransaction:[0],
        statut:['', Validators.required],
        categorieCarte:['', Validators.required],
        client: [],
      });
      this.router.navigate(['fidelite/cartes/lister-cartes'])
    }
  }


  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid){
      return;
    }else{

      this.carteMirror=new CarteMirror(
        this.editCustomerForm.value.numero,
        this.editCustomerForm.value.compteurPoint,
        this.editCustomerForm.value.montantAcumule,
        this.editCustomerForm.value.nombreTransaction,
        this.editCustomerForm.value.statut,
        this.editCustomerForm.value.categorieCarte,
        this.editCustomerForm.value.client,
      );

      console.log("Les données à enregistrer ............ ", this.carteMirror);
      this.cartesService.updateCarte(this.carteMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un commercant ******************* ", JSON.stringify(retour));
          this.reponse=retour;

          if(this.reponse.status!=0){
            this.router.navigate(['fidelite/cartes/lister-cartes'])
          } else{

          }
        },
        (err)=>{
          console.log("Erreur lors de l'update d'une catégories ");
        }
      )
    }
  }

  //get list des categories
  getAllCategories(){
    this.requestsService.getAllCategories().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.categories=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

  //get list des categories
  getAllCustomers(){
    this.requestsService.getAllClients().subscribe(
      (catRep)=>{
        console.log("Retour lister les clients ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.clients=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }


  ngOnInit() {

    console.log("Voici le commercant courant à editer  =================================== ", this.cartesService.getCurrentCarte());
    this.carte = this.cartesService.getCurrentCarte();
    this.initEditCustomerForm(this.carte);

    if(this.cartesService.getCurrentCarte()){
      this.getAllCategories();
      this.getAllCustomers();
    }
  }

}
