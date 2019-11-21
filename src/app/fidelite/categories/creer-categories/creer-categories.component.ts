import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesMirror, Reponse} from '../categories.model';
import {CategorieService} from '../categories.service';
import {Router} from '@angular/router';
import {UtilitairesService} from '../../utilitaires/utilitaires.service';
import {RequestsService} from '../../utilitaires/requests.service';


@Component({
  selector: 'app-creer-categories',
  templateUrl: './creer-categories.component.html',
  styleUrls: ['./creer-categories.component.scss']
})
export class CreerCategoriesComponent implements OnInit {

  errBack :  boolean ; //gestion erreur backend
  createCustomerForm : FormGroup;
  submitted : boolean = false;
  politiqueEvalution : any= [];
  reponse: Reponse;
  commercant : any = [];
  categorieMirror : CategoriesMirror;
  msgError : any;

  constructor(private requestsService : RequestsService, private fb: FormBuilder, private categorieService : CategorieService, private route:Router) {}

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      return;
    } else{
      this.categorieMirror =new CategoriesMirror(
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.lebelle,
        this.createCustomerForm.value.periodicite,
        this.createCustomerForm.value.action,
        this.createCustomerForm.value.politiqueEvaluation,
        this.createCustomerForm.value.statut,
        this.createCustomerForm.value.commercant);

      this.categorieService.addcategorie(this.categorieMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'une categorie ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.route.navigate(['fidelite/categories/lister-categories']);
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


  onReset(){
    this.createCustomerForm.reset();
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
        this.politiqueEvalution = retour;
        console.log(" Liste des evalutions *===================================== ",  this.politiqueEvalution);
      },
      (err)=>{
        console.log(" Une erreur c'est produite lors de la recuperation de la liste d'evaluation ");
      }
    );
  }

  ngOnInit() {

    this.createCustomerForm = this.fb.group({
      code: ['', Validators.required],
      lebelle: ['', [Validators.required, Validators.minLength(3)]],
      periodicite:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      statut: ['', Validators.required],
      action :['', Validators.required],
      politiqueEvaluation :['', Validators.required],
      commercant :['', Validators.required],
    });

    this.getMarchantList();
    this.getEvalutionlist();

  }

}
