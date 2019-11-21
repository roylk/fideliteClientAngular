import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaysMirror,VilleMirror } from '../../../clients/client.model';
import { Reponse } from '../../fidelisation.model';
import { Router } from '@angular/router';
import { RequestsService } from '../../../utilitaires/requests.service';
import { FidelisationService } from '../../fidelisation.service';
import { UtilitairesService } from '../../../utilitaires/utilitaires.service';

@Component({
  selector: 'app-editer-ville',
  templateUrl: './editer-ville.component.html',
  styleUrls: ['./editer-ville.component.scss']
})
export class EditerVilleComponent implements OnInit {

  editCustomerForm : FormGroup;
  msgError : any;
  submitted : boolean=false;
  paysMirror : PaysMirror;
  villeMirror: VilleMirror;
  reponse : Reponse;
  errBack : boolean = false;

  pays : PaysMirror;
  ville: VilleMirror;
  listevilles: any=[];
  listeRegions:any=[];

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
  initEditCustomerForm(ville){//initialisation
    if(ville){
      this.editCustomerForm = this.fb.group({
        id: [ville.id],
        code: [ville.code, Validators.required],
        nom: [ville.nom, Validators.required],
        region: [ville.region.id, Validators.required],
        description: [ville.description, Validators.required],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        id:[],
        code: ['', Validators.required],
        nom: ['', Validators.required],
        region: ['', Validators.required],
        description: ['', Validators.required],
      });
      this.router.navigate(['fidelite/fidelisations/lister-villes'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid) {
      return;
    } else{
      console.warn("Données formulaire  ", this.editCustomerForm.value);
      this.villeMirror=new VilleMirror(
        this.editCustomerForm.value.id,
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.nom,
        new Date(),
        this.editCustomerForm.value.region,
        this.editCustomerForm.value.description,
      );
      console.warn("Données formulaire à enregistrer ", this.villeMirror);
      this.fidelisationService.updateVille(this.villeMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/fidelisations/lister-villes']);
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

  getRegionList(){

    this.utilitairesService.getRegions().subscribe(
      (retour)=>{
        console.log("Liste des regions ******************* ", JSON.stringify(retour) );
        this.listeRegions=retour;
      },
      (err)=>{
        console.log("Erreur lors de la recuperation de la liste des Regions");
      }
    )
  }
  

  ngOnInit() {

    console.log("Voici l'objet courant à editer  =================================== ", this.fidelisationService.getCurrentVille());
    this.getRegionList();
    this.ville= this.fidelisationService.getCurrentVille();
    this.initEditCustomerForm(this.ville);
   

  }

}