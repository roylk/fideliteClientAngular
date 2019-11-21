import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarteMirror, Reponse} from '../carte.model';
import {Router} from '@angular/router';
import {CartesService} from '../cartes.service';
import {RequestsService} from '../../utilitaires/requests.service';

@Component({
  selector: 'app-creer-carte',
  templateUrl: './creer-carte.component.html',
  styleUrls: ['./creer-carte.component.scss']
})
export class CreerCarteComponent implements OnInit {

  createCustomerForm :  FormGroup;
  submitted : boolean = false;
  errBack : boolean= false;

  categories : any;
  clients : any;

  msgError : any;
  carteMirror : CarteMirror;
  reponse : Reponse;

  constructor(private route : Router, private carteService : CartesService, private fb: FormBuilder, private requestsService : RequestsService) { }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à enregistrer ............", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      return;
    } else{
      this.carteMirror =new CarteMirror(
        this.createCustomerForm.value.numero,
        this.createCustomerForm.value.compteurPoint,
        this.createCustomerForm.value.montantAcumule,
        this.createCustomerForm.value.nombreTransaction,
        this.createCustomerForm.value.statut,
        this.createCustomerForm.value.categorieCarte,
        this.createCustomerForm.value.client);

      this.carteService.addCarte(this.carteMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'une carte ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.route.navigate(['fidelite/cartes/lister-cartes']);
          } else{
            this.errBack=true;
            this.msgError = this.reponse.message;
          }
        },
        (err)=>{
          this.errBack=true;
          console.log("Erreur lors de la creation d'un commercant");
        })
    }
  }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
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

    this.createCustomerForm = this.fb.group({
      numero: ['', Validators.required],
      compteurPoint: [0],
      montantAcumule:[0],
      nombreTransaction: [0],
      statut :['', Validators.required],
      categorieCarte :['', Validators.required],
      client :[],
    });

    this.getAllCategories();
    this.getAllCustomers();
  }

}
