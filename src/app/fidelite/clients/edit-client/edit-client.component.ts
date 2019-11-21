import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { UtilitairesService } from '../../utilitaires/utilitaires.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientMirror, PaysMirror, Reponse } from '../client.model';

import { Router } from '@angular/router';
import { CreerClientsComponent } from '../creer-clients/creer-clients.component';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  editCustomerForm : FormGroup;
  listePays : any= [];
  listeRegion : any=[];
  listeVille : any= []
  clientMirror:ClientMirror;
  client:any;
  reponse: Reponse;
  submitted : boolean= false;
  minDate : number = new Date("2011-01-01").getFullYear();
  msgError : any="Problème d'enregistrement merci de reassayer plutard";
  errBack : boolean = false;
  showSpinner : boolean =false;
  dismissible = true;


  constructor(private clientsServices: ClientsService, private utilitairesService:UtilitairesService,
              private router : Router,      private fb: FormBuilder) { }

   returnBack():void{
          this.router.navigate(['fidelite/clients/lister-clients']);
              }
      
          //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

            

  /**** mise à jour d'un client***/
  initEditCustomerForm(client){//initialisation
    if(client){
      this.editCustomerForm = this.fb.group({
        code: [client.code,Validators.required],
        titre: [client.titre],
        nom: [client.nom, [Validators.required, Validators.minLength(3)]],
        prenom:[client.prenom],
        dateNaissance:[client.dateNaissance, Validators.required],
        telephone1:[client.telephone1, Validators.required],
        telephone2:[client.telephone2],
        adresse:[client.adresse, [Validators.required,Validators.minLength(3), Validators.maxLength(40)]],
        email: [client.email,Validators.required ],
        statut: [client.statut, Validators.required],
        ville :[client.ville.code, Validators.required],
        pays :[client.ville.region.pays.code, Validators.required],
        region :[client.ville.region.code, Validators.required],

      })}
     else {
      this.editCustomerForm = this.fb.group({
        code: ['',Validators.required],
        titre: [''],
        nom: ['', [Validators.required, Validators.minLength(3)]],
        prenom:[''],
        dateNaissance:['', Validators.required],
        telephone1:['', Validators.required],
        telephone2:[''],
        adresse:['', [Validators.required,Validators.minLength(3), Validators.maxLength(40)]],
        email: ['',Validators.required ],
        statut: ['', Validators.required],
        ville :['', Validators.required],
        pays :['', Validators.required],
        region :['', Validators.required],
      })

          this.router.navigate(['fidelite/clients/lister-clients'])
    }
  }
   
  onSubmit(){
    this.submitted = true;
    this.showSpinner = true;
    if( ! this.dismissible) this.dismissible = true;
    if(this.editCustomerForm.invalid) {
      this.valideDate(this.editCustomerForm.get("dateNaissance").value) ? this.editCustomerForm.controls['dateNaissance'].setErrors(null) : this.editCustomerForm.controls['dateNaissance'].setErrors({'incorrect ': true});
      this.showSpinner = false;
      return;
    }else {
      if(!this.valideDate(this.editCustomerForm.get("dateNaissance").value)){  
       this.editCustomerForm.controls['dateNaissance'].setErrors({'incorrect ': true});
        this.showSpinner = false;
        return ;
      }else{
        this.editCustomerForm.controls['dateNaissance'].setErrors(null); 
    console.warn("Données formulaire  ", this.editCustomerForm.value)
    this.clientMirror=new ClientMirror(
      this.editCustomerForm.value.code,
      this.editCustomerForm.value.titre,
      this.editCustomerForm.value.nom,
      this.editCustomerForm.value.prenom,
      this.editCustomerForm.value.dateNaissance,
      this.editCustomerForm.value.telephone1,
      this.editCustomerForm.value.telephone2,
      this.editCustomerForm.value.adresse,
      this.editCustomerForm.value.email,
      this.editCustomerForm.value.statut,
      this.editCustomerForm.value.ville);
     
console.log("Les données à enregistrer ............ ", this.clientMirror);
    this.clientsServices.updateClient(this.clientMirror).subscribe(
      (retour)=>{
        console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
        this.reponse=retour;

        if(this.reponse.status==1){
          this.errBack=false;
             console.log("retour bd", this.reponse.message);
          this.router.navigate(['fidelite/clients/lister-clients'])
        }else{
          this.errBack=true;
          this.msgError = this.reponse.message;
        }
        this.showSpinner = false;
          
      },
      (err)=>{
        this.errBack=true;
        console.log("Erreur lors de la creation d'un client ");
        this.showSpinner = false;
      }
    )
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
    this.editCustomerForm.reset();
    this.submitted=false;
  }


    

   /*  getRegion(ev){
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
      
      )}  */

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




    /* getVilles(ev){
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
      
    } */

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
          console.log("Liste des pays ******************* ", JSON.stringify(retour) )
          this.listePays=retour;
        },
        (err)=>{
          console.log("Erreur lors de la recuperation de la liste des pays");
        }
      )
    }

  ngOnInit() {
    console.log("Voici le client courant à editer  =================================== ", this.clientsServices.getCurrentClient())
    this.client=this.clientsServices.getCurrentClient();
    this.initEditCustomerForm(this.clientsServices.getCurrentClient());
  
    if(this.clientsServices.getCurrentClient()){
      this.getVilles(this.client.ville['region'].code);
      this.getRegion(this.client.ville['region']['pays'].code);
      this.getPays();
    }
   
  }

}
