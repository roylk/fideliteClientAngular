import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OffreMirror, Reponse} from '../../fidelisation.model';
import {Router} from '@angular/router';
import {RequestsService} from '../../../utilitaires/requests.service';
import {FidelisationService} from '../../fidelisation.service';

@Component({
  selector: 'app-editer-offre',
  templateUrl: './editer-offre.component.html',
  styleUrls: ['./editer-offre.component.scss']
})
export class EditerOffreComponent implements OnInit {

  editCustomerForm : FormGroup;
  offre :  any;
  msgError : any;
  submitted : boolean=false;
  offreMirror : OffreMirror;
  reponse : Reponse;
  errBack : boolean = false;
  listeCategories : any=[];
  listeTypeOffres : any=[];

  constructor( private router : Router,
               private requestsService : RequestsService,
               private fb : FormBuilder,
               private fidelisationService : FidelisationService) { }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(offre){//initialisation
    if(offre){
      this.editCustomerForm = this.fb.group({
        id : [offre.id],
        code: [offre.code, Validators.required],
        libele: [offre.libele, Validators.required],
        orientation: [offre.orientation, [Validators.required]],
        dateDebut:[offre.dateDebut, Validators.required],
        dateFin:[offre.dateFin, Validators.required],
        statut:[offre.statut,Validators.required],
        categorieCarte:[offre.categorieCarte.code,Validators.required],
        typeOffre:[offre.typeOffre.code, [Validators.required]],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        id : [],
        code: ['', Validators.required],
        libele: ['', Validators.required],
        orientation: ['', [Validators.required]],
        dateDebut:['', Validators.required],
        dateFin:['', Validators.required],
        statut:['',Validators.required],
        categorieCarte:['',Validators.required],
        typeOffre:['', [Validators.required]],
      });
      this.router.navigate(['fidelite/fidelisations/lister-offres'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid) {
      this.valideDate(this.editCustomerForm.value.dateDebut, this.editCustomerForm.value.dateFin) ? this.editCustomerForm.controls['dateFin'].setErrors(null) : this.editCustomerForm.controls['dateFin'].setErrors({'incorrect ': true});
      return;
    } else {
      if(!this.valideDate(this.editCustomerForm.value.dateDebut, this.editCustomerForm.value.dateFin)){
        this.editCustomerForm.controls['dateDebut'].setErrors({'incorrect ': true});
        this.editCustomerForm.controls['dateFin'].setErrors({'incorrect ': true});
        return ;
      } else{
        this.editCustomerForm.controls['dateFin'].setErrors(null);
        console.warn("Données formulaire  ", this.editCustomerForm.value);
        this.offreMirror=new OffreMirror(
          this.editCustomerForm.value.id,
          this.editCustomerForm.value.code,
          this.editCustomerForm.value.libele,
          this.editCustomerForm.value.orientation,
          this.editCustomerForm.value.dateDebut,
          this.editCustomerForm.value.dateFin,
          this.editCustomerForm.value.statut,
          this.editCustomerForm.value.categorieCarte,
          this.editCustomerForm.value.typeOffre);

        this.fidelisationService.updateoffre(this.offreMirror).subscribe(
          (retour)=>{
            console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
            this.reponse=retour;
            if (this.reponse.status==1){
              this.errBack=false;
              console.log("retour bd", this.reponse.message);
              this.router.navigate(['fidelite/fidelisations/lister-offres']);
            } else{
              this.errBack=true;
              this.msgError = this.reponse.message;
            }
          },
          (err)=>{
            this.errBack=true;
            console.log("Erreur lors de la creation d'un client ");
          })
      }
    }

  }


  valideDate(dateDebut, dateFin){
    let dD, dF, dcourant;
    dD = new Date(dateDebut).getFullYear();
    dF = new Date(dateFin).getFullYear();
    dcourant = new Date().getFullYear();

    if((dD <= dF)&&(dcourant<=dD)){
      return true;
    } else {
      return false
    }
  }

  getAllCategories(){
    this.requestsService.getAllCategories().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.listeCategories=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

  getAllOffres(){
    this.requestsService.getAllTypeoffres().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.listeTypeOffres=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }

  ngOnInit() {

    console.log("Voici le terminal courant à editer  =================================== ", this.fidelisationService.getCurrentOffre());

    this.offre= this.fidelisationService.getCurrentOffre();
    this.initEditCustomerForm(this.offre);

    if(this.fidelisationService.getCurrentOffre()){
      //liste des types d'offre
      this.getAllOffres();

      //liste des categories
      this.getAllCategories();
    }
  }


}
