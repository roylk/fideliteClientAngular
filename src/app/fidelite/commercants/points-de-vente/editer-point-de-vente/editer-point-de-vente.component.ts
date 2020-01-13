import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PointsDeVenteMirror, Reponse} from '../../commercant.model';
import {Router} from '@angular/router';
import {CommercantsService} from '../../commercant.service';
import {UtilitairesService} from '../../../utilitaires/utilitaires.service';
import {RequestsService} from '../../../utilitaires/requests.service';

@Component({
  selector: 'app-editer-point-de-vente',
  templateUrl: './editer-point-de-vente.component.html',
  styleUrls: ['./editer-point-de-vente.component.scss']
})
export class EditerPointDeVenteComponent implements OnInit {

  editCustomerForm : FormGroup;
  listePays : any= [];
  listeRegion : any=[];
  listeVille : any= [];
  pointDeventeMirror:PointsDeVenteMirror;
  reponse: Reponse;

  msgError : any;
  submitted : boolean=false;

  pointDeVente :  any;

  commercants : any = [];


  constructor( private fb : FormBuilder, private router : Router,
               private commercantsService : CommercantsService,
               private requestsService : RequestsService,
               private utilitairesService : UtilitairesService) { }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }


  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(pointDeVente){//initialisation
    if(pointDeVente){
      this.editCustomerForm = this.fb.group({
        code: [pointDeVente.code, Validators.required],
        acronyme: [pointDeVente.acronyme, Validators.required],
        nom: [pointDeVente.nom, [Validators.required, Validators.minLength(3)]],
        adresse:[pointDeVente.adresse, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        email: [pointDeVente.email, Validators.required],
        telephone1:[pointDeVente.telephone1,Validators.required],
        telephone2:[pointDeVente.telephone2],
        statut: [pointDeVente.statut, Validators.required],
        commercant :[pointDeVente.commercantCode.code, Validators.required],
        pays : [pointDeVente.ville.region.pays.code, Validators.required],
        region : [pointDeVente.ville.region.code, Validators.required],
        ville :[pointDeVente.ville.code, Validators.required],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        code: ['', Validators.required],
        acronyme: ['', Validators.required],
        nom: ['', [Validators.required, Validators.minLength(3)]],
        adresse:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        telephone1:['',Validators.required],
        telephone2:[''],
        email: ['', Validators.required],
        statut: ['', Validators.required],
        commercant :['', Validators.required],
        pays : ['', Validators.required],
        region : ['', Validators.required],
        ville :['', Validators.required],
      });
      this.router.navigate(['fidelite/commercants/lister-points-de-vente'])
    }
  }


  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid){
      return;
    }else{

      this.pointDeventeMirror=new PointsDeVenteMirror(
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.acronyme,
        this.editCustomerForm.value.nom,
        this.editCustomerForm.value.adresse,
        this.editCustomerForm.value.email,
        this.editCustomerForm.value.telephone1,
        this.editCustomerForm.value.telephone2,
        this.editCustomerForm.value.statut,
        this.editCustomerForm.value.commercant,
        this.editCustomerForm.value.ville,
      );

      console.log("Les données à enregistrer ............ ", this.pointDeventeMirror);
      this.commercantsService.updatePointDeVente(this.pointDeventeMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un commercant ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if(this.reponse.status!=0){
            this.router.navigate(['fidelite/commercants/lister-points-de-vente'])
          } else{}
        },
        (err)=>{
          console.log("Erreur lors de l'update d'une catégories ");
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

  getAllcommercants(){
    this.requestsService.getAllCommercants().subscribe(
      (retour)=>{
        console.log('liste des commercants ................................................ ', retour);
        if(retour.status == 1){
          this.commercants = retour.data
        }
      },
      (err)=>{
        console.log('Erreur lors de la recuperation de la liste des commercants ');
      }
    )
  }


  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }


  ngOnInit() {

    console.log("Voici le commercant courant à editer  =================================== ", this.commercantsService.getCurrentPointDeVente());

    this.pointDeVente = this.commercantsService.getCurrentPointDeVente();
    this.initEditCustomerForm(this.pointDeVente);


    if(this.commercantsService.getCurrentPointDeVente()){
      this.getVilles(this.pointDeVente.ville['region'].code);
      this.getRegion(this.pointDeVente.ville['region']['pays'].code);
      this.getPays();
      this.getAllcommercants();
    }
  }

}
