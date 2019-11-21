import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reponse} from '../../fidelisation.model';
import {Router} from '@angular/router';
import {RequestsService} from '../../../utilitaires/requests.service';
import {FidelisationService} from '../../fidelisation.service';
import {PaysMirror} from '../../../clients/client.model';

@Component({
  selector: 'app-editer-pays',
  templateUrl: './editer-pays.component.html',
  styleUrls: ['./editer-pays.component.scss']
})
export class EditerPaysComponent implements OnInit {

  editCustomerForm : FormGroup;
  msgError : any;
  submitted : boolean=false;
  paysMirror : PaysMirror;
  reponse : Reponse;
  errBack : boolean = false;

  pays : PaysMirror;

  constructor(private router : Router,
              private requestsService : RequestsService,
              private fb : FormBuilder,
              private fidelisationService : FidelisationService) { }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(pays){//initialisation
    if(pays){
      this.editCustomerForm = this.fb.group({
        code: [pays.code, Validators.required],
        nom: [pays.nom, Validators.required],
        description: [pays.description, Validators.required],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        code: ['', Validators.required],
        nom: ['', Validators.required],
        description: ['', Validators.required],
      });
      this.router.navigate(['fidelite/fidelisations/lister-pays'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid) {
      return;
    } else{
      console.warn("Données formulaire  ", this.editCustomerForm.value);
      this.paysMirror=new PaysMirror(
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.nom,
        new Date(),
        this.editCustomerForm.value.description,
      );
      console.warn("Données formulaire à enregistrer ", this.paysMirror);
      this.fidelisationService.updatePays(this.paysMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
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
          console.log("Erreur lors de la creation d'un pays ");
        })
    }
  }

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }

  ngOnInit() {

    console.log("Voici le terminal courant à editer  =================================== ", this.fidelisationService.getCurrentPays());

    this.pays= this.fidelisationService.getCurrentPays();
    this.initEditCustomerForm(this.pays);

  }

}
