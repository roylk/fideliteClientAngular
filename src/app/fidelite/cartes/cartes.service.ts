import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitairesService } from '../utilitaires/utilitaires.service';
import {environment} from '../../../environments/environment'
import {CarteMirror, Reponse} from './carte.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CartesService {

  private apiUrl = environment.apiUrl; //'http://localhost:8080/ufifidelite/api';  // URL to web api

  private carte : CarteMirror;

  constructor(private http :HttpClient, private utilitairesService:UtilitairesService) { }

  //for observable use in real distant service
  getCartes(): Observable<CarteMirror[]>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<CarteMirror[]>(this.apiUrl+'/Cartes')
   .pipe(tap(_ => console.log('service liste Carte consommé avec succès')),
   catchError(this.handleError<CarteMirror[]>('getCarte', []))
     
   ); //
 }
 /** POST: add a new eleve to the server */
 addCarte(CarteMirror): Observable<Reponse> {
  return this.http.post(this.apiUrl +'/carte', CarteMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('addCarte'))
  );
}

updateCarte(CarteMirror): Observable<Reponse> {
  return this.http.put(`${this.apiUrl}/cartes/${CarteMirror.numero}`, CarteMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('updateCarte'))
  );
}

/* GET heroes whose name contains search term */
searchCarte(code: string): Observable<CarteMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new CarteMirror());
  }
  return this.http.get<CarteMirror>(`${this.apiUrl}/Cartecartes/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<CarteMirror>('searchCarte'))
  );
}

/* GET heroes whose name contains search term */
deleteCarte(code: string): Observable<CarteMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new CarteMirror());
  }
  return this.http.delete<CarteMirror>(`${this.apiUrl}/Cartecartes/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<CarteMirror>('deleteCarte'))
  );
}

/*** initialisation d'un Carte ****/
setNewCarte(carte : CarteMirror){
  this.carte = new CarteMirror(carte.numero, carte.compteurPoint,
    carte.montantAcumule, carte.nombreTransaction, carte.statut,
    carte.categorieCarte, carte.client)
}

/*** initialisation d'un Carte ****/
getCurrentCarte(){
  return this.carte;
}

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 */
 
 // @param operation - name of the operation that failed
 //@param result - optional value to return as the observable result
 
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
