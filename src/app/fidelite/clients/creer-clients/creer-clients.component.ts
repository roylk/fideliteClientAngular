import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ClientMirror, PaysMirror,Reponse } from '../client.model';
import { ClientsService } from '../clients.service';
import {UtilitairesService } from '../../utilitaires/utilitaires.service'
import { Router } from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-creer-clients',
  templateUrl: './creer-clients.component.html',
  styleUrls: ['./creer-clients.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class CreerClientsComponent implements OnInit {

  clientMirror: ClientMirror;
  listePays : any=[];
  listeVille : any=[];
  listeRegion : any=[];
  reponse: Reponse;
  submitted : boolean= false;
  minDate : number = new Date("2011-01-01").getFullYear();
  msgError : any="Problème d'enregistrement merci de reassayer plutard";
  errBack : boolean = false;
  createCustomerForm : FormGroup;
  showSpinner : boolean =false;
  dismissible = true;


  constructor(private clientsService:ClientsService, private route:Router, 
            private utilitairesService : UtilitairesService, private fb: FormBuilder) { }

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
    //consommation du service web ou Endpoint du backend qui permet d'ajouter un nouvel élève
    /* this.clientsService.addClient(this.clientMirror).
    subscribe(clientMirrorRep=>console.log(clientMirrorRep)); */

   this.submitted = true;
    this.showSpinner = true;
    if( ! this.dismissible) this.dismissible = true;

    console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

   if(this.createCustomerForm.invalid) {
     this.valideDate(this.createCustomerForm.get("dateNaissance").value) ? this.createCustomerForm.controls['dateNaissance'].setErrors(null) : this.createCustomerForm.controls['dateNaissance'].setErrors({'incorrect ': true});
     this.showSpinner = false;
     return;
   }  else {
     if(!this.valideDate(this.createCustomerForm.get("dateNaissance").value)){  
      this.createCustomerForm.controls['dateNaissance'].setErrors({'incorrect ': true});
       this.showSpinner = false;
       return ;
     }else{
      this.createCustomerForm.controls['dateNaissance'].setErrors(null);
      console.warn("Données formulaire  ", this.createCustomerForm.value);
      this.clientMirror=new ClientMirror(
        this.createCustomerForm.value.code,
        this.createCustomerForm.value.titre,
        this.createCustomerForm.value.nom,
        this.createCustomerForm.value.prenom,
        this.createCustomerForm.value.dateNaissance,
        this.createCustomerForm.value.telephone1,
        this.createCustomerForm.value.telephone2,
        this.createCustomerForm.value.adresse,
        this.createCustomerForm.value.email,
        this.createCustomerForm.value.statut,
        this.createCustomerForm.value.ville);
      
      this.clientsService.addClient(this.clientMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour
          if (this.reponse.status==1){
            this.errBack=false;
             console.log("retour bd", this.reponse.message);
             this.route.navigate(['fidelite/clients/lister-clients']);
          } else{
            this.errBack=true;
            this.msgError = this.reponse.message;
          }
          this.showSpinner = false;
        },
        (err)=>{
          this.errBack=true;
          console.log("Erreur lors de la creation d'un client ");
          this.showSpinner = false;
        })
     }
   }

  }

  valideDate(dateSaisie){
    if(dateSaisie){
      console.log("jhjhsdjhdfjhdfjhdfjhdfjhdf dfjkdfjkdfjkdfjk  ", " data saisie  : ",(new Date(dateSaisie)).getFullYear(), "Date min : ", this.minDate,  "   resultat", ((new Date(dateSaisie)).getFullYear() < this.minDate))
      return ((new Date(dateSaisie)).getFullYear() < this.minDate)
    } else {
      return false
    }
  }

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
  }

  ngOnInit() {

    this.createCustomerForm = this.fb.group({
      code: ['', Validators.required],
      titre: [''],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom:[''],
      dateNaissance:['', Validators.required],
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
