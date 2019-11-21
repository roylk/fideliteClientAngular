import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilitairesService} from '../../../utilitaires/utilitaires.service';
import {Router} from '@angular/router';
import {RequestsService} from '../../../utilitaires/requests.service';
import {PointsDeVenteMirror, Reponse} from '../../commercant.model';
import {CommercantsService} from '../../commercant.service';

@Component({
  selector: 'app-creer-point-de-vente',
  templateUrl: './creer-point-de-vente.component.html',
  styleUrls: ['./creer-point-de-vente.component.scss']
})
export class CreerPointDeVenteComponent implements OnInit {

  createCustomerForm : FormGroup;

  submitted :  boolean=false;

  commercants : any;
  reponse : Reponse;
  errBack : boolean= false;
  msgError : any;
  pointsDeVenteMirror : PointsDeVenteMirror;


  listePays : any =[];
  listeRegion : any =[];
  listeVille : any =[];

  constructor( private utilitairesService:UtilitairesService,
               private router : Router,
               private requestService : RequestsService,
               private fb : FormBuilder,
                private commercantsService : CommercantsService){}


   getMarchandsList(){
        this.requestService.getAllCommercants().subscribe(
                   (commercantsRep)=>{
                     console.log("Retour lister commercants ******************* ", JSON.stringify(commercantsRep));
                     this.reponse=commercantsRep;
                     if (this.reponse.status==1){
                       this.commercants=this.reponse.data;}
                     else{
                       console.log("Erreur...........,", this.reponse.message)
                     }
                     //this.dataSource=new MatTableDataSource(commercantsRep)
                   });
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
    } else {
      //this.createCustomerForm.controls['dateNaissance'].setErrors(null);
      console.warn("Données formulaire  ", this.createCustomerForm.value);
      this.pointsDeVenteMirror =new PointsDeVenteMirror(
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.acronyme,
        this.createCustomerForm.value.nom,
        this.createCustomerForm.value.adresse,
        this.createCustomerForm.value.email,
        this.createCustomerForm.value.telephone1,
        this.createCustomerForm.value.telephone2,
        this.createCustomerForm.value.statut,
        this.createCustomerForm.value.commercant,
        this.createCustomerForm.value.ville);

      console.warn("Données à enregisteres ****************************  ", this.pointsDeVenteMirror);

      this.commercantsService.addPointDeVente(this.pointsDeVenteMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/commercants/lister-points-de-vente']);
          } else{
            this.errBack=true;
            this.msgError = this.reponse.message;
          }
        },
        (err)=>{
          this.errBack=true;
          console.log("Erreur lors de la creation d'un point de vente");
        })
    }
  }

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
  }

  //recuperation de la liste des regions
  getRegion(ev){
    console.log(" appel de la liste des region du pays *******************************************  ", ev.target.value)
    this.utilitairesService.getRegionByPays(ev.target.value).subscribe(
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
  //recuperation de la liste des villes
  getVilles(ev){
    console.log(" appel de la liste des villes de la region *******************************************  ", ev.target.value);
    this.utilitairesService.getVilleByRegion(ev.target.value).subscribe(
      (retour)=>{
        console.log("liste des listes  ", JSON.stringify(retour));
        this.listeVille = retour
      },
      (err)=>{
        console.log(" Erreur ", err);
      }
    )
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

    //liste des commercnants
    this.getMarchandsList();

    //liste de pays
    this.getCountryList()
  }

}
