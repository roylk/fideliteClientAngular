import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestsService} from '../utilitaires/requests.service';
import {Reponse} from '../clients/client.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  pageAble : any={arrayPage : [], pageNumber : 0, arrayData : [], sizePage : 5} ;
  reponse  : Reponse;
  @Input() numeroPage : number;
  @Input() sizePage : number;
  @Input() url : string;
  @Output() arrayDataEvent = new EventEmitter<any[]>();

  showSpinner : boolean = false;


  constructor( private requestService : RequestsService) { }

  getCurrentPage(url, numeroPage, sizePage){

    let obj = {arrayPage : [], pageNumber : 0, arrayData : [], sizePage : 5};

    this.showSpinner = true;

    console.log("Numero de la page demandée *****************************************************             ", numeroPage);
    this.requestService.getAllPageELements(url, numeroPage, sizePage).subscribe(
      (clientsRep)=>{
        console.log("Retour lister des infos d'une page ******************* ", JSON.stringify(clientsRep));
        this.reponse=clientsRep;
        if (this.reponse.status==1){
          obj.arrayPage = new Array(this.reponse['data']['totalPages']);
          obj.pageNumber =  numeroPage;
          obj.arrayData = this.reponse['data']['content'];
          obj.sizePage = sizePage;
        }else{
          console.log("Erreur lors de l'appel de la page ...........,", this.reponse.message);
        }
    },
      (err)=>{
        console.log(" Erreur lors de la recuperation de la page");
    },
      ()=>{
        this.addNewArrayData(this.pageAble.arrayData);
        this.showSpinner = false;
      });

    return obj;
  }

  addNewArrayData(value: any[]) {
    this.arrayDataEvent.emit(value);
  }

  ngOnInit() {
    this.pageAble =  this.getCurrentPage(this.url, this.numeroPage, this.sizePage);
  }

}
