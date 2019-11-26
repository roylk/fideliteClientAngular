import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reponse } from '../../fidelite/clients/client.model';
import { LoginService } from '../../fidelite/utilitaires/login.service';
import { Router } from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';



export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class LoginComponent {

  submitted : boolean= false;
  
   msgError : any="";
   errBack : boolean = false;
   createCustomerForm : FormGroup;
   dismissible = true;
   reponse : Reponse;
   login: any;
   motDePasse:any;

   constructor(private fb : FormBuilder,  private router : Router, private loginService:LoginService) { }

   //recuperation du formulaire pour les test de validation
  get f(){
    return this.createCustomerForm.controls;
  }

  onSubmit(){

    this.submitted = true;
    console.log("Les données à soumettre ............ ", this.createCustomerForm.value);

    if(this.createCustomerForm.invalid) {
      return;
    }else{
      console.warn("Données formulaire  ", this.createCustomerForm.value);
      this.login=this.createCustomerForm.value;
      //this.motDePasse=this.createCustomerForm.value.motDePasse;
        
      console.log("Voici les infos à soumettre***************************** : ", this.login);
      this.loginService.connexion(this.login).subscribe(
        (retour)=>{

          console.log("Retour creation d'une région ******************* ", JSON.stringify(retour));
          this.reponse=retour;
          if (this.reponse.status==1){
            this.errBack=false;
            console.log("back-end", this.reponse.message);
            this.router.navigate(['/dashboard']);
          } else{
            this.errBack=true;
            this.msgError = this.reponse.message;
            this.router.navigate(['/login']);
          }
        },
        (err)=>{
          this.errBack=true;
          console.log("Erreur lors de la creation de la villes");
        })
    }

   
  }

  ngOnInit() {
  this.createCustomerForm = this.fb.group({
    login: ['', Validators.required],
    motDePasse: ['', Validators.required],
    
  });
}

}
