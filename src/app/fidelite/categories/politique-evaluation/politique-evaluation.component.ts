import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RequestsService} from '../../utilitaires/requests.service';
import {Reponse} from '../categories.model';
import {CategorieService} from '../categories.service';

@Component({
  selector: 'app-politique-evaluation',
  templateUrl: './politique-evaluation.component.html',
  styleUrls: ['./politique-evaluation.component.scss']
})
export class PolitiqueEvaluationComponent implements OnInit {

  reponse : Reponse;
  politiques : any;

  constructor( private router : Router, private requestsService : RequestsService, private categorieService : CategorieService ) { }

  editElement(politique){
    this.categorieService.setNewpolitqueEvaluation(politique);
    this.router.navigate(['fidelite/categories/editer-politique']);
  }

  ngOnInit() {
    this.requestsService.getAllEvaluationPolicies().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.politiques=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

}
