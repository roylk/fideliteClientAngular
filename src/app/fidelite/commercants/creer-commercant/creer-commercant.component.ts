import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { CommercantMirror, PaysMirror,Reponse } from '../commercant.model';
import { CommercantsService } from '../commercant.service';
import {UtilitairesService } from '../../utilitaires/utilitaires.service'
import { Router } from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-creer-commercant',
  templateUrl: './creer-commercant.component.html',
  styleUrls: ['./creer-commercant.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class CreerCommercantComponent implements OnInit {
  commercantMirror: CommercantMirror;
  listePays : any=[];
  listeVille : any=[];
  listeRegion : any=[];
  reponse: Reponse;

  submitted : boolean= false;
 // minDate : number = new Date("2011-01-01").getFullYear();
  msgError : any="Problème d'enregistrement merci de reassayer plutard";
  errBack : boolean = false;
  createCustomerForm : FormGroup;
  dismissible = true;


  constructor(private commercantsService:CommercantsService, private route:Router, 
            private utilitairesService : UtilitairesService, private fb: FormBuilder) {

  }

  //recuperation de la liste des regions 
  getRegion(ev){
   console.log(" appel de la liste des region du pays *******************************************  ", ev.target.value) 
      this.utilitairesService.getRegionByPays(ev.target.value).subscribe(
        (retour)=>{
          console.log("liste des regions  ", JSON.stringify(retour))
          if(this.listeRegion.length !=0) this.listeVille =[]; //Permet la reinitialisation au changement du pays
          this.listeRegion = retour
        },
        (err)=>{
          console.log(" Erreur ", err);
        },
      
      )
  }
  //recuperation de la liste des villes
  getVilles(ev){
    console.log(" appel de la liste des villes de la region *******************************************  ", ev.target.value)
      this.utilitairesService.getVilleByRegion(ev.target.value).subscribe(
        (retour)=>{
          console.log("liste des listes  ", JSON.stringify(retour))
          this.listeVille = retour
        },
        (err)=>{
          console.log(" Erreur ", err);
        }
      )
  }

//recuperation du formulaire pour les test de validation
get f(){
  return this.createCustomerForm.controls;
}

  getPays(){
    
    this.utilitairesService.getPays().subscribe(
      (retour)=>{
        console.log("Liste des pays ******************* ", JSON.stringify(retour) )
        this.listePays=retour;
      },
      (err)=>{
        console.log("Erreur lors de la recuperation de la liste des pays");
      }
    )
  }

  onSubmit(){


   this.submitted = true;
   console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

   if(this.createCustomerForm.invalid) {
      //this.valideDate(this.createCustomerForm.get("dateNaissance").value) ? this.createCustomerForm.controls['dateNaissance'].setErrors(null) : this.createCustomerForm.controls['dateNaissance'].setErrors({'incorrect ': true});
      return;
   } /* else {
     if(!this.valideDate(this.createCustomerForm.get("dateNaissance").value)){  
      this.createCustomerForm.controls['dateNaissance'].setErrors({'incorrect ': true}); 
      return ;
     } */ 
    else{
      //this.createCustomerForm.controls['dateNaissance'].setErrors(null);
      console.warn("Données formulaire  ", this.createCustomerForm.value)
      this.commercantMirror =new CommercantMirror(
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.acronyme,
        this.createCustomerForm.value.nom,
        this.createCustomerForm.value.telephone1,
        this.createCustomerForm.value.telephone2,
        this.createCustomerForm.value.adresse,
        this.createCustomerForm.value.email,
        this.createCustomerForm.value.statut,
        this.createCustomerForm.value.ville);
      
      this.commercantsService.addCommercant(this.commercantMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
             console.log("retour bd", this.reponse.message);
             this.route.navigate(['fidelite/commercants/lister-commercants']);
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

  ngOnInit() {

    this.createCustomerForm = this.fb.group({
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

    this.getPays();

    //this.clientMirror=new ClientMirror('','','','',new Date(),'','','','',0,'');

  }
}

