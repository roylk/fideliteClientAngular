import { Component, OnInit } from '@angular/core';
import {OffreMirror, Reponse, TypeOffreMirror} from '../../fidelisation.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FidelisationService} from '../../fidelisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creer-type-offre',
  templateUrl: './creer-type-offre.component.html',
  styleUrls: ['./creer-type-offre.component.scss']
})
export class CreerTypeOffreComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted  : boolean=false;
  typeOffreMirror : TypeOffreMirror;

  reponse : Reponse;
  errBack :  boolean=false;
  msgError : any="";

  constructor(private fidelisationService : FidelisationService, private router : Router, private fb : FormBuilder) { }

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
        this.typeOffreMirror=new TypeOffreMirror(
          0,
          this.createCustomerForm.value.code,
          this.createCustomerForm.value.libele,
          this.createCustomerForm.value.description);

        this.fidelisationService.addTypeOffre(this.typeOffreMirror).subscribe(
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
            console.log("Erreur lors de la creation d'un type d'offre ");
          })
      }
    }

  ngOnInit() {

    this.createCustomerForm = this.fb.group({
      code: ['', Validators.required],
      libele: ['', Validators.required],
      description: ['', [Validators.required,Validators.minLength(20)]],
    });
  }

}
