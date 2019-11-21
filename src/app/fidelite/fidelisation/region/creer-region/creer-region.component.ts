import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaysMirror,RegionMirror } from '../../../clients/client.model';
import { Reponse } from '../../fidelisation.model';
import { FidelisationService } from '../../fidelisation.service';
import { Router } from '@angular/router';
import { UtilitairesService } from '../../../utilitaires/utilitaires.service';

@Component({
  selector: 'app-creer-region',
  templateUrl: './creer-region.component.html',
  styleUrls: ['./creer-region.component.scss']
})
export class CreerRegionComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted  : boolean=false;
  paysMirror : PaysMirror;
  regionMirror: RegionMirror;
  listePays: any=[];

  reponse : Reponse;
  errBack :  boolean=false;
  msgError : any="";

  constructor(private fb : FormBuilder, private fidelisationService : FidelisationService, private router : Router, private utilitairesService:UtilitairesService) { }

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
      this.regionMirror=new RegionMirror(
        0,
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.nom,
        new Date(),
        this.createCustomerForm.value.pays,
        this.createCustomerForm.value.description,
        );

      console.log("Voici les infos à sauvegarder ***************************** : ", this.regionMirror);
      this.fidelisationService.addRegion(this.regionMirror).subscribe(
        (retour)=>{

          console.log("Retour creation d'une région ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/fidelisations/lister-regions']);
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
  getCountryList(){

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
  
  ngOnInit() {
    this.createCustomerForm = this.fb.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      pays: ['', Validators.required],
      description: ['', [Validators.required]],
      
    });

    this.getCountryList();
  }
 
}
