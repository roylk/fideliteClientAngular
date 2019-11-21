import { Component, OnInit } from '@angular/core';
import { CommercantsService } from '../commercant.service';
import { UtilitairesService } from '../../utilitaires/utilitaires.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommercantMirror, Reponse } from '../commercant.model';

import { Router } from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-edit-commercant',
  templateUrl: './edit-commercant.component.html',
  styleUrls: ['./edit-commercant.component.scss']
})
export class EditCommercantComponent implements OnInit {

  editCustomerForm : FormGroup;
  listePays : any= [];
  listeRegion : any=[];
  listeVille : any= [];
  commercantMirror:CommercantMirror;
  reponse: Reponse;
  commercant : any;

  submitted : boolean =false;
 
  // minDate : number = new Date("2011-01-01").getFullYear();
   msgError : any="Problème d'enregistrement merci de reassayer plus tard";
   errBack : boolean = false;
   dismissible = true;
 


  constructor(private commercantsService: CommercantsService, private utilitairesService:UtilitairesService,
              private router : Router,      private fb: FormBuilder) { }

//recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

   returnBack():void{
          this.router.navigate(['fidelite/commercants/lister-commercants']);
              }
            

  /**** mise à jour d'un client***/
  initEditCustomerForm(commercant){//initialisation
    if(commercant){
      this.editCustomerForm = this.fb.group({
        code: [commercant.code, Validators.required],
        nom: [commercant.nom, [Validators.required, Validators.minLength(3)]],
        acronyme:[commercant.acronyme,[Validators.required, Validators.minLength(3)]],
        telephone1:[commercant.telephone1,Validators.required],
        telephone2:[commercant.telephone2],
        adresse:[commercant.adresse,[Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        email: [commercant.email, Validators.required],
        statut: [commercant.statut,Validators.required],
        ville :[commercant.ville.code,Validators.required],
        pays :[commercant.ville.region.pays.code,Validators.required],
        region :[commercant.ville.region.code,Validators.required],
        
      })}
     else {
      this.editCustomerForm = this.fb.group({
        code: ['', Validators.required],
        nom: ['', [Validators.required, Validators.minLength(3)]],
        acronyme: ['', [Validators.required, Validators.minLength(3)]],
        telephone1:['',Validators.required],
        telephone2:[''],
        adresse:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        email: ['', Validators.required],
        statut: ['', Validators.required],
        ville :['', Validators.required],
        pays :['', Validators.required],
        region :['', Validators.required],
      });
      this.router.navigate(['fidelite/commercants/lister-commercants'])
    }
  }
   
  onSubmit(){
    this.submitted=true;
    if(this.editCustomerForm.invalid)
    {
      return;
    }
    else{
    console.warn("Données formulaire  ", this.editCustomerForm.value);
    this.commercantMirror=new CommercantMirror(
      this.editCustomerForm.value.code,
      this.editCustomerForm.value.acronyme,
      this.editCustomerForm.value.nom,
      this.editCustomerForm.value.telephone1,
      this.editCustomerForm.value.telephone2,
      this.editCustomerForm.value.adresse,
      this.editCustomerForm.value.email,
      this.editCustomerForm.value.statut,
      this.editCustomerForm.value.ville);
     
console.log("Les données à enregistrer ............ ", this.commercantMirror);
    this.commercantsService.updateCommercant(this.commercantMirror).subscribe(
      (retour)=>{
        console.log("Retour mise à jour d'un commercant ******************* ", JSON.stringify(retour));
        this.reponse=retour;

        if(this.reponse.status==1){
          this.errBack=false;
          console.log("retour bd", this.reponse.message);
          this.router.navigate(['fidelite/commercants/lister-commercants'])
        } else{
          this.errBack=true;
          this.msgError = this.reponse.message;
        }  
      },
      (err)=>{
        this.errBack=true;
        console.log("Erreur lors de la mise à jour  d'un commercant ");
      }
    )
    
  }
}

    getRegion(ev){
      //console.log(" appel de la liste des region du pays *******************************************  ", ev.target.value);
      let value;
      if(ev.target != undefined){value = ev.target.value} else{value = ev}
      this.utilitairesService.getRegionByPays(value).subscribe(
        (retour)=>{
          console.log("liste des regions  ", JSON.stringify(retour));
          if(this.listeRegion.length !=0) this.listeVille =[]; //Permet la reinitialisation au changement du pays
          this.listeRegion = retour
        },
        (err)=>{
          console.log(" Erreur ", err);
        },
      )
    } 
    getVilles(ev){
      //console.log(" appel de la liste des villes de la region *******************************************  ", ev.target.value);
      let value ;

      if(ev.target != undefined){value = ev.target.value} else{value = ev}
      this.utilitairesService.getVilleByRegion(value).subscribe(
        (retour)=>{
          console.log("liste des listes  ", JSON.stringify(retour));
          this.listeVille = retour
        },
        (err)=>{
          console.log(" Erreur ", err);
        }
      )
      
    }

    getPays(){
      this.utilitairesService.getPays().subscribe(
        (retour)=>{
          console.log("Liste des pays ******************* ", JSON.stringify(retour) );
          this.listePays=retour;
        },
        (err)=>{
          console.log("Erreur lors de la recuperation de la liste des pays");
        }
      )
    }

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }

  ngOnInit() {
    console.log("Voici le commercant courant à editer  =================================== ", this.commercantsService.getCurrentCommercant());
    this.commercant = this.commercantsService.getCurrentCommercant();
    this.initEditCustomerForm(this.commercantsService.getCurrentCommercant());
    if(this.commercantsService.getCurrentCommercant()){
      this.getVilles(this.commercant.ville['region'].code);
      this.getRegion(this.commercant.ville['region']['pays'].code);
      this.getPays();
    }
  }

}
