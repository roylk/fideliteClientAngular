import { Component, OnInit } from '@angular/core';
import { RegionMirror, PaysMirror } from '../../../clients/client.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reponse } from '../../fidelisation.model';
import { Router } from '@angular/router';
import { RequestsService } from '../../../utilitaires/requests.service';
import { FidelisationService } from '../../fidelisation.service';
import { UtilitairesService } from '../../../utilitaires/utilitaires.service';


@Component({
  selector: 'app-editer-region',
  templateUrl: './editer-region.component.html',
  styleUrls: ['./editer-region.component.scss']
})
export class EditerRegionComponent implements OnInit {

  editCustomerForm : FormGroup;
  msgError : any;
  submitted : boolean=false;
  paysMirror : PaysMirror;
  regionMirror: RegionMirror;
  reponse : Reponse;
  errBack : boolean = false;

  pays : PaysMirror;
  region: RegionMirror;
  listePays:any=[];

  constructor(private router : Router,
              private requestsService : RequestsService,
              private fb : FormBuilder,
              private fidelisationService : FidelisationService,
              private utilitairesService:UtilitairesService) { }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(region){//initialisation
    if(region){
      this.editCustomerForm = this.fb.group({
        id: [region.id],
        code: [region.code, Validators.required],
        nom: [region.nom, Validators.required],
        pays: [region.pays.code, Validators.required],
        description: [region.description, Validators.required],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        id:[],
        code: ['', Validators.required],
        nom: ['', Validators.required],
        pays: ['', Validators.required],
        description: ['', Validators.required],
      });
      this.router.navigate(['fidelite/fidelisations/lister-regions'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid) {
      return;
    } else{
      console.warn("Données formulaire  ", this.editCustomerForm.value);
      this.regionMirror=new RegionMirror(
        this.editCustomerForm.value.id,
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.nom,
        new Date(),
        this.editCustomerForm.value.pays,
        this.editCustomerForm.value.description,
      );
      console.warn("Données formulaire à enregistrer ", this.regionMirror);
      this.fidelisationService.updateRegion(this.regionMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
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
          console.log("Erreur lors de la creation d'un pays ");
        })
    }
  }

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
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

    console.log("Voici l'objet courant à editer  =================================== ", this.fidelisationService.getCurrentRegion());
    this.getCountryList();
    this.region= this.fidelisationService.getCurrentRegion();
    this.initEditCustomerForm(this.region);
   

  }

}