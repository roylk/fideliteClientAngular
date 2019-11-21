import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reponse, TypeOffreMirror} from '../../fidelisation.model';
import {PaysMirror} from '../../../clients/client.model';
import {FidelisationService} from '../../fidelisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creer-pays',
  templateUrl: './creer-pays.component.html',
  styleUrls: ['./creer-pays.component.scss']
})
export class CreerPaysComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted  : boolean=false;
  paysMirror : PaysMirror;

  reponse : Reponse;
  errBack :  boolean=false;
  msgError : any="";

  constructor(private fb : FormBuilder, private fidelisationService : FidelisationService, private router : Router) { }

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
  }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      return;
    }else{
      console.warn("Données formulaire  ", this.createCustomerForm.value);
      this.paysMirror=new PaysMirror(
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.nom,
        new Date(),
        this.createCustomerForm.value.description);

      console.log("Voici les infos à sauvegarder ***************************** : ", this.paysMirror);
      this.fidelisationService.addPays(this.paysMirror).subscribe(
        (retour)=>{

          console.log("Retour creation d'un pays ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/fidelisations/lister-pays']);
          } else{
            this.errBack=true;
            this.msgError = this.reponse.message;
          }
        },
        (err)=>{
          this.errBack=true;
          console.log("Erreur lors de la creation du pays");
        })
    }
  }


  ngOnInit() {


    this.createCustomerForm = this.fb.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

}
