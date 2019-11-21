import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TerminalMirror} from '../../../commercants/commercant.model';
import {Router} from '@angular/router';
import {PolitiqueEvaluationsMirror, Reponse} from '../../categories.model';
import {CategorieService} from '../../categories.service';

@Component({
  selector: 'app-editer-politique-evaluation',
  templateUrl: './editer-politique-evaluation.component.html',
  styleUrls: ['./editer-politique-evaluation.component.scss']
})
export class EditerPolitiqueEvaluationComponent implements OnInit {

  editCustomerForm : FormGroup;
  submitted : boolean = false;
  politiqueMirror : PolitiqueEvaluationsMirror;

  reponse : Reponse;
  politque : any;

  constructor( private router : Router, private categorieService : CategorieService, private fb : FormBuilder) { }

  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(politique){//initialisation
    if(politique){
      this.editCustomerForm = this.fb.group({
        code: [politique.code, Validators.required],
        libele: [politique.libele, [Validators.required, Validators.minLength(10)]],
        description: [politique.description, [Validators.required, Validators.minLength(40)]],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        code: ['', Validators.required],
        libele: ['', [Validators.required, Validators.minLength(10)]],
        description: ['', [Validators.required, Validators.minLength(40)]],
      });
      this.router.navigate(['fidelite/categories/lister-politiques'])
    }
  }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid){
      return;
    }else{
      this.politiqueMirror=new PolitiqueEvaluationsMirror(
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.libele,
        this.editCustomerForm.value.description
      );
      console.log("Les données à enregistrer ............ ", this.politiqueMirror);
      this.categorieService.updatePolitique(this.politiqueMirror).subscribe(
        (retour)=>{
          console.log("Retour update d'un terminal ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if(this.reponse.status!=0){
            this.router.navigate(['fidelite/categories/lister-politiques'])
          } else{}
        },
        (err)=>{
          console.log("Erreur lors de l'update d'un terminal ");
        }
      )
    }
  }


  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }

  ngOnInit(){


    console.log("Voici le terminal courant à editer  =================================== ", this.categorieService.getCurrentPolitiqueEvaluation());

    this.politque = this.categorieService.getCurrentPolitiqueEvaluation();
    this.initEditCustomerForm(this.politque);

  }

}
