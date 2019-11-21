import { Component, OnInit } from '@angular/core';
import {Reponse, PalierMirror} from '../../fidelisation.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FidelisationService} from '../../fidelisation.service';
import {Router} from '@angular/router';
import {RequestsService} from '../../../utilitaires/requests.service';

@Component({
  selector: 'app-creer-palier',
  templateUrl: './creer-palier.component.html',
  styleUrls: ['./creer-palier.component.scss']
})
export class CreerPalierComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted : boolean = false;
  palierMirror : PalierMirror;
  reponse : Reponse;
  errBack :  boolean=false;
  msgError : string ="";

  offres : any=[];

  constructor( private fidelisationService : FidelisationService,
               private router : Router, private fb : FormBuilder, private requestsService :  RequestsService ) { }


//recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onReset(){
    this.createCustomerForm.reset();
    this.submitted=false;
  }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à enregistrer ............ ", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      return;
    } else{
        console.warn("Données formulaire  ", this.createCustomerForm.value);
        this.palierMirror=new PalierMirror(
          0,
          this.createCustomerForm.value.montantInf,
          this.createCustomerForm.value.montantSup,
          this.createCustomerForm.value.uniteDevise,
          this.createCustomerForm.value.unitePoint,
          this.createCustomerForm.value.offre,
         );

      console.warn("Valeur envoyé pour un palier *********  ", this.palierMirror);
        this.fidelisationService.addPalier(this.palierMirror).subscribe(
          (retour)=>{
            console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
            this.reponse=retour;
            if (this.reponse.status==1){
              this.errBack=false;
              console.log("retour bd", this.reponse.message);
              this.router.navigate(['fidelite/fidelisations/lister-paliers']);
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

    getAllOffres(){
      this.requestsService.getAllOffres().subscribe(
        (catRep)=>{
          console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
          this.reponse=catRep;
          if (this.reponse.status==1){
            this.offres=this.reponse.data;
          } else{
            console.log("Erreur...........,", this.reponse.message)
          }
          //this.dataSource=new MatTableDataSource(commercantsRep)
        });
    }

  ngOnInit() {

    this.createCustomerForm = this.fb.group({
      montantInf: ['', Validators.required],
      montantSup: ['', Validators.required],
      uniteDevise: ['', [Validators.required]],
      unitePoint:['', Validators.required],
      offre:['', Validators.required]
    });

    //recuperation de la liste des offres
    this.getAllOffres();
  }

}
