import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup  } from '@angular/forms';
import { CommercantMirror, PaysMirror,Reponse } from '../commercant.model';
import { CommercantsService } from '../commercant.service';
import {UtilitairesService } from '../../utilitaires/utilitaires.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail-commercant',
  templateUrl: './detail-commercant.component.html',
  styleUrls: ['./detail-commercant.component.scss']
})
export class DetailCommercantComponent implements OnInit {
  commercant : CommercantMirror;

  constructor(private commercantsService:CommercantsService, private route:Router, 
    private utilitairesService : UtilitairesService, private fb: FormBuilder) { }

    returnBack():void{
      this.route.navigate(['fidelite/commercants/lister-commercants']);
    }
  




  ngOnInit() {
    console.log("Voici le client courant à editer  =================================== ", this.commercantsService.getCurrentCommercant());
    this.commercant=this.commercantsService.getCurrentCommercant();
  }

}
