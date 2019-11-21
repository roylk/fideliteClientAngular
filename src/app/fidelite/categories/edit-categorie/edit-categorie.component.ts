import { Component, OnInit } from '@angular/core';
import {CategorieService} from '../categories.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesMirror, Reponse} from '../../categories/categories.model';
import {RequestsService} from '../../utilitaires/requests.service';


@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  editCustomerForm : FormGroup;
  categorie :  any;
  msgError : any;
  submitted : boolean=false;

  categorieMirror : CategoriesMirror;
  reponse : Reponse;

  politique_evalution : any;
  commercant : any;

  constructor( private requestsService : RequestsService, private categorieService : CategorieService, private router :  Router, private fb: FormBuilder,) { }


  /**** mise à jour d'un client***/
  initEditCustomerForm(categorie){//initialisation
    if(categorie){
      this.editCustomerForm = this.fb.group({
        code: [categorie.code, Validators.required],
        lebelle: [categorie.lebelle, Validators.required],
        periodicite:[categorie.periodicite, Validators.required],
        statut:[categorie.statut, Validators.required],
        action:[categorie.action, Validators.required],
        politiqueEvaluation:[categorie.politiqueEvaluation.code, Validators.required],
        commercant: [categorie.commercant.code, Validators.required],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        code: ['', Validators.required],
        lebelle: ['', Validators.required],
        periodicite:['', Validators.required],
        statut:['', Validators.required],
        action:['', Validators.required],
        politiqueEvaluation:['', Validators.required],
        commercant: ['', Validators.required],
      });
      this.router.navigate(['fidelite/categories/lister-categories'])
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

      this.categorieMirror=new CategoriesMirror(
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.lebelle,
        this.editCustomerForm.value.periodicite,
        this.editCustomerForm.value.action,
        this.editCustomerForm.value.politiqueEvaluation,
        this.editCustomerForm.value.statut,
        this.editCustomerForm.value.commercant,
      );

      console.log("Les données à enregistrer ............ ", this.categorieMirror);
      this.categorieService.updatecategorie(this.categorieMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un commercant ******************* ", JSON.stringify(retour));
          this.reponse=retour;

          if(this.reponse.status!=0){
            this.router.navigate(['fidelite/categories/lister-categories'])
          } else{

          }
        },
        (err)=>{
          console.log("Erreur lors de l'update d'une catégories ");
        }
      )

    }

  }

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }

  //get liste des commercants
  getMarchantList(){

    this.requestsService.getMarchandList().subscribe(
      (retour)=>{
        this.commercant =retour;
        console.log(" Liste des marchants *********************************** ",  this.commercant);
      },
      (err)=>{
        console.log(" Une erreur c'est produite lors de la recuperation de la liste des marchands ");
      }
    );
  }

  //get liste de la politique d'evaluation
  getEvalutionlist(){
    this.requestsService.getEvaluationList().subscribe(
      (retour)=>{
        this.politique_evalution = retour;
        console.log(" Liste des evalutions *===================================== ",  this.politique_evalution);
      },
      (err)=>{
        console.log(" Une erreur c'est produite lors de la recuperation de la liste d'evaluation ");
      }
    );
  }

  ngOnInit() {

    console.log("Voici le commercant courant à editer  =================================== ", this.categorieService.getCurrentcategorie());
    this.categorie = this.categorieService.getCurrentcategorie();
    this.initEditCustomerForm(this.categorie);

    if(this.categorieService.getCurrentcategorie()){
      this.getEvalutionlist();
      this.getMarchantList();
    }
  }

}
