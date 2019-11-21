import { Component, OnInit } from '@angular/core';
import {CategorieService} from '../categories.service';
import {Reponse} from '../categories.model'
import {Router} from '@angular/router';
import {RequestsService} from '../../utilitaires/requests.service';

@Component({
  selector: 'app-lister-categories',
  templateUrl: './lister-categories.component.html',
  styleUrls: ['./lister-categories.component.scss']
})
export class ListerCategoriesComponent implements OnInit {

  reponse : Reponse;
  categories : any;

  constructor( private categorieService : CategorieService, private router :  Router, private requestsService : RequestsService) { }

  editElement(categorie){
    this.categorieService.setNewcategorie(categorie);
    this.router.navigate(['fidelite/categories/edit-categorie']);
  }

  showElement(categorie){
    this.categorieService.setNewcategorie(categorie);
    this.router.navigate(['fidelite/categories/detail-categorie']);

  }

  addPageItem(arrayData){
    this.categories =arrayData;}


  ngOnInit() {
    this.requestsService.getAllCategories().subscribe(
      (catRep)=>{
        console.log("Retour lister les categories ******************* ", JSON.stringify(catRep));
        this.reponse=catRep;
        if (this.reponse.status==1){
          this.categories=this.reponse.data;
        } else{
          console.log("Erreur...........,", this.reponse.message)
        }
        //this.dataSource=new MatTableDataSource(commercantsRep)
      });
  }

}
