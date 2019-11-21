import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TerminalMirror} from '../../../commercants/commercant.model';
import {PolitiqueEvaluationsMirror, Reponse} from '../../categories.model';
import {CategorieService} from '../../categories.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creer-politique-evaluation',
  templateUrl: './creer-politique-evaluation.component.html',
  styleUrls: ['./creer-politique-evaluation.component.scss']
})
export class CreerPolitiqueEvaluationComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted : boolean = false;
  msgError : any="";
  errBack :  boolean= false;

  politiqueMirror : PolitiqueEvaluationsMirror;
  reponse :  Reponse;

  constructor(private fb : FormBuilder, private categorieService : CategorieService, private  router : Router) { }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
  }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      return;
    }else{
      console.warn("Données formulaire  ", this.createCustomerForm.value);
      this.politiqueMirror =new PolitiqueEvaluationsMirror(
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.libele,
        this.createCustomerForm.value.description);

      console.log("Retour creation d'un client ******************* ", this.politiqueMirror);

      this.categorieService.addPolitiqueEvaluation(this.politiqueMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/categories/lister-politiques']);
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
      libele: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(40)]],
    });
  }

}
