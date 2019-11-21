import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup  } from '@angular/forms';
import { ClientMirror, PaysMirror,Reponse } from '../client.model';
import { ClientsService } from '../clients.service';
import {UtilitairesService } from '../../utilitaires/utilitaires.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail-clients',
  templateUrl: './detail-clients.component.html',
  styleUrls: ['./detail-clients.component.scss']
})
export class DetailClientsComponent implements OnInit {
  client: ClientMirror;

  constructor(private clientsService:ClientsService, private route:Router, 
    private utilitairesService : UtilitairesService, private fb: FormBuilder) { }

    returnBack():void{
      this.route.navigate(['fidelite/clients/lister-clients']);
    }
  




  ngOnInit() {
    console.log("Voici le client courant à editer  =================================== ", this.clientsService.getCurrentClient())
    this.client=this.clientsService.getCurrentClient();
  }

}
