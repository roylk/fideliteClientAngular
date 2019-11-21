import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PalierMirror, Reponse, TypeOffreMirror} from '../../fidelisation.model';
import {Router} from '@angular/router';
import {RequestsService} from '../../../utilitaires/requests.service';
import {FidelisationService} from '../../fidelisation.service';

@Component({
  selector: 'app-editer-type-offre',
  templateUrl: './editer-type-offre.component.html',
  styleUrls: ['./editer-type-offre.component.scss']
})
export class EditerTypeOffreComponent implements OnInit {


  editCustomerForm : FormGroup;
  msgError : any;
  submitted : boolean=false;
  typeOffreMirror : TypeOffreMirror;
  reponse : Reponse;
  errBack : boolean = false;

  typeOffre : any;

  constructor(private router : Router,
              private requestsService : RequestsService,
              private fb : FormBuilder,
              private fidelisationService : FidelisationService) {}

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(typeOffre){//initialisation
    if(typeOffre){
      this.editCustomerForm = this.fb.group({
        id : [typeOffre.id],
        code: [typeOffre.code, Validators.required],
        libelle: [typeOffre.libelle, Validators.required],
        description: [typeOffre.description, [Validators.required,Validators.minLength(20)]],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        id :[],
        code: ['', Validators.required],
        libelle: ['', Validators.required],
        description: ['', [Validators.required,Validators.minLength(20)]],
      });
      this.router.navigate(['fidelite/fidelisations/lister-paliers'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid) {
      return;
    } else{
      console.warn("Données formulaire  ", this.editCustomerForm.value);
      this.typeOffreMirror=new TypeOffreMirror(
        0,
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.libelle,
        this.editCustomerForm.value.description,
      );

      this.fidelisationService.updateTypeOffre(this.typeOffreMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/fidelisations/lister-type-offres']);
          } else{
            this.errBack=true;
            this.msgError = this.reponse.message;
          }
        },
        (err)=>{
          this.errBack=true;
          console.log("Erreur lors de la creation d'un client ");
        })
    }
  }

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }


  ngOnInit() {

    console.log("Voici le terminal courant à editer  =================================== ", this.fidelisationService.getCurrentTypeOffre());

    this.typeOffre= this.fidelisationService.getCurrentTypeOffre();
    this.initEditCustomerForm(this.typeOffre);

  }

}
