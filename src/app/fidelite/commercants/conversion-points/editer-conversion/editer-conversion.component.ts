import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConversionMirror, Reponse} from '../../commercant.model';
import {Router} from '@angular/router';
import {CommercantsService} from '../../commercant.service';
import {RequestsService} from '../../../utilitaires/requests.service';

@Component({
  selector: 'app-editer-conversion',
  templateUrl: './editer-conversion.component.html',
  styleUrls: ['./editer-conversion.component.scss']
})
export class EditerConversionComponent implements OnInit {

  editCustomerForm : FormGroup;
  submitted : boolean=false;
  reponse : Reponse;
  conversionMirror : ConversionMirror;
  conversion :  any;
  commercants : any=[];

  errBack :  boolean = false;
  msgError : any="";

  constructor( private router : Router,
               private fb : FormBuilder,
               private commercantsService : CommercantsService,
               private requestsService : RequestsService) { }

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }

  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(conversion){//initialisation
    if(conversion){
      this.editCustomerForm = this.fb.group({
        id : [conversion.id],
        nbpointInf: [conversion.nbpointInf, Validators.required],
        nbpointSup: [conversion.nbpointSup, [Validators.required]],
        reduction: [conversion.reduction, [Validators.required]],
        type:[conversion.type,Validators.required],
        commercant:[conversion.commercant.code,Validators.required],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        id : [],
        nbpointInf: ['', Validators.required],
        nbpointSup: ['', [Validators.required]],
        reduction: ['', [Validators.required]],
        type:['',Validators.required],
        commercant:['',Validators.required],
      });
      this.router.navigate(['fidelite/commercants/lister-conversions'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid){
      return;
    }else{
      this.conversionMirror=new ConversionMirror(
        this.editCustomerForm.value.id,
        this.editCustomerForm.value.nbpointInf,
        this.editCustomerForm.value.nbpointSup,
        this.editCustomerForm.value.reduction,
        this.editCustomerForm.value.type,
        this.editCustomerForm.value.commercant,
      );
      console.log("Les données à enregistrer ............ ", this.conversionMirror);
      this.commercantsService.updateConversion(this.conversionMirror).subscribe(
        (retour)=>{
          console.log("Retour update d'un terminal ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if(this.reponse.status!=0){
            this.router.navigate(['fidelite/commercants/lister-conversions'])
          } else{}
        },
        (err)=>{
          console.log("Erreur lors de l'update d'une conversion ");
        }
      )
    }
  }

  onReset(){
    this.editCustomerForm.reset();
    this.submitted=false;
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
      });
  }

  ngOnInit() {

    console.log("Voici la conversion  courante à editer  =================================== ", this.commercantsService.getCurrentConversion());

    this.conversion = this.commercantsService.getCurrentConversion();
    this.initEditCustomerForm(this.conversion);
    if(this.commercantsService.getCurrentConversion()){
      this.getAllCommercants()
    }

  }

}
