import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OffreMirror, Reponse} from '../../fidelisation.model';
import {FidelisationService} from '../../fidelisation.service';
import {Router} from '@angular/router';
import {RequestsService} from '../../../utilitaires/requests.service';

@Component({
  selector: 'app-creer-offre',
  templateUrl: './creer-offre.component.html',
  styleUrls: ['./creer-offre.component.scss']
})
export class CreerOffreComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted  : boolean=false;
  offreMirror : OffreMirror;

  reponse : Reponse;
  errBack :  boolean=false;
  msgError : any="";

  listeTypeOffres : any=[];
  listeCategories : any=[];


  constructor(private fb : FormBuilder,
              private fidelisationService : FidelisationService,
              private router : Router,
              private requestsService : RequestsService) { }


//recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      this.valideDate(this.createCustomerForm.value.dateDebut, this.createCustomerForm.value.dateFin) ? this.createCustomerForm.controls['dateFin'].setErrors(null) : this.createCustomerForm.controls['dateFin'].setErrors({'incorrect ': true});
      return;
    } else {
      if(!this.valideDate(this.createCustomerForm.value.dateDebut, this.createCustomerForm.value.dateFin)){
        this.createCustomerForm.controls['dateDebut'].setErrors({'incorrect ': true});
        this.createCustomerForm.controls['dateFin'].setErrors({'incorrect ': true});
        return ;
      } else{
        this.createCustomerForm.controls['dateFin'].setErrors(null);
        console.warn("Données formulaire  ", this.createCustomerForm.value);
        this.offreMirror=new OffreMirror(
          0,
          this.createCustomerForm.value.code,
          this.createCustomerForm.value.libele,
          this.createCustomerForm.value.orientation,
          this.createCustomerForm.value.dateDebut,
          this.createCustomerForm.value.dateFin,
          this.createCustomerForm.value.statut,
          this.createCustomerForm.value.categorieCarte,
          this.createCustomerForm.value.typeOffre);

        this.fidelisationService.addoffre(this.offreMirror).subscribe(
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

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
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
        console.log("Retour lister ls types d'offres ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.listeTypeOffres=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

  ngOnInit() {

    this.createCustomerForm = this.fb.group({
      code: ['', Validators.required],
      libele: ['', Validators.required],
      orientation: ['', [Validators.required]],
      dateDebut:['', Validators.required],
      dateFin:['', Validators.required],
      statut:['',Validators.required],
      categorieCarte:['',Validators.required],
      typeOffre:['', [Validators.required]],
    });

    //get liste des categories
    this.getAllCategories();

    //get liste des types d'offres
    this.getAllOffres();

  }

}
