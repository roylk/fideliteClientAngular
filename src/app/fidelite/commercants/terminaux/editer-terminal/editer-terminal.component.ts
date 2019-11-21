import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../../utilitaires/requests.service';
import {Router} from '@angular/router';
import {TerminalMirror, Reponse} from '../../commercant.model';
import {CommercantsService} from '../../commercant.service';

@Component({
  selector: 'app-editer-terminal',
  templateUrl: './editer-terminal.component.html',
  styleUrls: ['./editer-terminal.component.scss']
})
export class EditerTerminalComponent implements OnInit {

  editCustomerForm : FormGroup;
  terminal :  any;
  listeDesPoints : any=[];
  msgError : any;
  submitted : boolean=false;
  terminalMirror : TerminalMirror;
  reponse : Reponse;

  constructor( private fb : FormBuilder, private requestsService : RequestsService,
               private router :  Router, private commercantsService : CommercantsService) {}

  //recuperation du formulaire pour les test de validation
  get f(){
    return this.editCustomerForm.controls;
  }


  /**** mise à jour d'un Point de vente ***/
  initEditCustomerForm(terminal){//initialisation
    if(terminal){
      this.editCustomerForm = this.fb.group({
        code: [terminal.code, Validators.required],
        designation: [terminal.designation, [Validators.required, Validators.minLength(3)]],
        numeroSerie: [terminal.numeroSerie, [Validators.required, Validators.minLength(3)]],
        statut:[terminal.statut,Validators.required],
        pointDeVente:[terminal.pointDeVente.code,Validators.required],
      })}
    else {
      this.editCustomerForm = this.fb.group({
        code: ['', Validators.required],
        designation: ['', [Validators.required, Validators.minLength(3)]],
        numeroSerie: ['', [Validators.required, Validators.minLength(3)]],
        statut:['',Validators.required],
        pointDeVente:['',Validators.required],
      });
      this.router.navigate(['fidelite/commercants/lister-terminaux'])
    }
  }

  onSubmit(){
    this.submitted =  true;
    console.warn("Données formulaire  ", this.editCustomerForm.value);

    if(this.editCustomerForm.invalid){
      return;
    }else{
      this.terminalMirror=new TerminalMirror(
        this.editCustomerForm.value.code,
        this.editCustomerForm.value.designation,
        this.editCustomerForm.value.numeroSerie,
        this.editCustomerForm.value.pointDeVente,
        this.editCustomerForm.value.statut,
      );
      console.log("Les données à enregistrer ............ ", this.terminalMirror);
      this.commercantsService.updateTerminal(this.terminalMirror).subscribe(
        (retour)=>{
          console.log("Retour update d'un terminal ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if(this.reponse.status!=0){
            this.router.navigate(['fidelite/commercants/lister-terminaux'])
          } else{}
        },
        (err)=>{
          console.log("Erreur lors de l'update d'un terminal ");
        }
      )
    }
  }

  getAllSellsPoints(){
    this.requestsService.getAllPointesDeVentes().subscribe(
      (retour)=>{
        console.log("Retour lister des points de vente ******************* ", JSON.stringify(retour));
        this.reponse=retour;
        if (this.reponse.status==1){
          this.listeDesPoints=this.reponse.data;}
        else{
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

    console.log("Voici le terminal courant à editer  =================================== ", this.commercantsService.getCurrentTerminal());

    this.terminal = this.commercantsService.getCurrentTerminal();
    this.initEditCustomerForm(this.terminal);

    if(this.commercantsService.getCurrentTerminal()){
      this.getAllSellsPoints()
    }
  }

}
