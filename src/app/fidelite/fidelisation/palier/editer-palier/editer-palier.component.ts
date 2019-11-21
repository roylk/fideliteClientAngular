import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OffreMirror, PalierMirror, Reponse} from '../../fidelisation.model';
import {Router} from '@angular/router';
import {RequestsService} from '../../../utilitaires/requests.service';
import {FidelisationService} from '../../fidelisation.service';

@Component({
  selector: 'app-editer-palier',
  templateUrl: './editer-palier.component.html',
  styleUrls: ['./editer-palier.component.scss']
})
export class EditerPalierComponent implements OnInit {


  editCustomerForm : FormGroup;
  msgError : any;
  submitted : boolean=false;
  palierMirror : PalierMirror;
  reponse : Reponse;
  errBack : boolean = false;
  listeOffres: any=[];
  palier : any;
  constructor( private router : Router,
               private requestsService : RequestsService,
               private fb : FormBuilder,
               private fidelisationService : FidelisationService) { }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(palier){//initialisation
    if(palier){
      this.editCustomerForm = this.fb.group({
        id: [palier.id],
        montantInf: [palier.montantInf, Validators.required],
        montantSup: [palier.montantSup, Validators.required],
        uniteDevise: [palier.uniteDevise, [Validators.required]],
        unitePoint:[palier.unitePoint, Validators.required],
        offre:[palier.offre.code, Validators.required]
      })}
    else {
      this.editCustomerForm = this.fb.group({
        id :[],
        montantInf: ['', Validators.required],
        montantSup: ['', Validators.required],
        uniteDevise: ['', [Validators.required]],
        unitePoint:['', Validators.required],
        offre:['', Validators.required]
      });
      this.router.navigate(['fidelite/fidelisations/lister-paliers'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid) {
      return;
    } else{
        console.warn("Données formulaire  ", this.editCustomerForm.value);
        this.palierMirror=new PalierMirror(
          this.editCustomerForm.value.id,
          this.editCustomerForm.value.montantInf,
          this.editCustomerForm.value.montantSup,
          this.editCustomerForm.value.uniteDevise,
          this.editCustomerForm.value.unitePoint,
          this.editCustomerForm.value.offre,
         );

        this.fidelisationService.updatePalier(this.palierMirror).subscribe(
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

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
  }

  getAllOffres(){
    this.requestsService.getAllOffres().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.listeOffres=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }


  ngOnInit() {

    console.log("Voici le terminal courant à editer  =================================== ", this.fidelisationService.getCurrentPalier());

    this.palier= this.fidelisationService.getCurrentPalier();
    this.initEditCustomerForm(this.palier);

    if(this.fidelisationService.getCurrentPalier()){
      //liste des types d'offre
      this.getAllOffres();
    }

  }

}
