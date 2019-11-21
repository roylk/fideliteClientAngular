import { Component, OnInit } from '@angular/core';
import {CommercantMirror, ConversionMirror, Reponse, TerminalMirror} from '../../commercant.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../../utilitaires/requests.service';
import {CommercantsService} from '../../commercant.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creer-conversion',
  templateUrl: './creer-conversion.component.html',
  styleUrls: ['./creer-conversion.component.scss']
})
export class CreerConversionComponent implements OnInit {

  createCustomerForm : FormGroup;
  submitted : boolean = false;
  reponse : Reponse;
  conversionMirror : ConversionMirror;
  commercants : any;
  errBack :  boolean = false;
  msgError : any="";

  constructor( private requestsService : RequestsService,
               private commercantsService : CommercantsService,
               private router : Router,
               private fb : FormBuilder) { }

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
    }else{
      console.warn("Données formulaire  ", this.createCustomerForm.value);
      this.conversionMirror =new ConversionMirror(
        0,
        this.createCustomerForm.value.nbpointInf,
        this.createCustomerForm.value.nbpointSup,
        this.createCustomerForm.value.reduction,
        this.createCustomerForm.value.type,
        this.createCustomerForm.value.commercant);

      console.log("Retour creation d'un client ******************* ", this.conversionMirror);

      this.commercantsService.addConversion(this.conversionMirror).subscribe(
        (retour)=>{
          console.log("Retour creation d'un client ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("retour bd", this.reponse.message);
            this.router.navigate(['fidelite/commercants/lister-conversions']);
          } else{
            this.errBack=true;
            this.msgError = this.reponse.message;
          }
        },
        (err)=>{
          this.errBack=true;
          console.log("Erreur lors de la creation d'un modèle de conversion");
        })
    }
  }

  getAllCommercants(){
    this.requestsService.getAllCommercants().subscribe(
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


  ngOnInit() {

    this.createCustomerForm = this.fb.group({
      nbpointInf: ['', Validators.required],
      nbpointSup: ['', [Validators.required]],
      reduction: ['', [Validators.required]],
      type:['',Validators.required],
      commercant:['',Validators.required],
    });
    //recuperation de la liste des commercants
    this.getAllCommercants();

  }

}
