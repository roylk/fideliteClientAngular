import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../../utilitaires/requests.service';
import {TerminalMirror, Reponse} from '../../commercant.model';
import {CommercantsService} from '../../commercant.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creer-terminal',
  templateUrl: './creer-terminal.component.html',
  styleUrls: ['./creer-terminal.component.scss']
})
export class CreerTerminalComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted : boolean = false;
  msgError : any="";
  errBack :  boolean= false;

  listeDesPoints : any=[];
  terminalMirror : TerminalMirror;
  reponse ; Reponse;

  constructor( private fb : FormBuilder, private  requestsService : RequestsService,
               private commercantsService : CommercantsService,
               private router : Router) {}


  //recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
  }

  getAllSellPoints(){
    this.requestsService.getAllPointesDeVentes().subscribe(
      (retour)=>{
        if(retour.status==1){
          this.listeDesPoints = retour.data;
        }

        console.log(" liste des differents points de ventes : ", retour);
      },
      (err)=>{
        console.log(" Erreur lors de la recuperation des points de ventes ");
      }
    )
  }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      return;
    }else{
      console.warn("Données formulaire  ", this.createCustomerForm.value);
      this.terminalMirror =new TerminalMirror(
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.designation,
        this.createCustomerForm.value.numeroSerie,
        this.createCustomerForm.value.pointDeVente,
        this.createCustomerForm.value.statut);

      console.log("Retour creation d'un client ******************* ", this.terminalMirror);

      this.commercantsService.addTerminal(this.terminalMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/commercants/lister-terminaux']);
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

  ngOnInit() {

    this.createCustomerForm = this.fb.group({
      code: ['', Validators.required],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      numeroSerie: ['', [Validators.required, Validators.minLength(3)]],
      statut:['',Validators.required],
      pointDeVente:['',Validators.required],
    });

    //recuperation de la liste des points de vente
    this.getAllSellPoints();
  }
}

