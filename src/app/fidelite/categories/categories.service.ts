import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CategoriesMirror, PolitiqueEvaluationsMirror, Reponse} from './categories.model';
import { UtilitairesService } from '../utilitaires/utilitaires.service';
import {environment} from '../../../environments/environment'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = environment.apiUrl; //'http://localhost:8080/ufifidelite/api';  // URL to web api

  private categorie : CategoriesMirror;
  private politque : PolitiqueEvaluationsMirror;

  constructor(private http :HttpClient, private utilitairesService:UtilitairesService) { }

  //for observable use in real distant service
  getcategories(): Observable<CategoriesMirror[]>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<CategoriesMirror[]>(this.apiUrl+'/categories')
   .pipe(tap(_ => console.log('service liste categorie consommé avec succès')),
   catchError(this.handleError<CategoriesMirror[]>('getcategorie', []))
     
   ); //
 }

  //for observable use in real distant service
  getAllcategorie(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<Reponse>(this.apiUrl+'/categoriecartesR')
   .pipe(tap(_ => console.log('service liste categorie consommé avec succès')),
   catchError(this.handleError<Reponse>('getAllcategorie'))
     
   ); //
 }

 /** POST: add a new eleve to the server */
 addcategorie(CategoriesMirror): Observable<Reponse> {
  return this.http.post(this.apiUrl +'/categoriecarte', CategoriesMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('addcategorie'))
  );
}

  /** POST: add a new eleve to the server */
  addPolitiqueEvaluation(politiqueMirror): Observable<Reponse> {
    return this.http.post(this.apiUrl +'/politiqueevaluation', politiqueMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addcategorie'))
    );
  }

updatecategorie(CategoriesMirror): Observable<Reponse> {
  return this.http.put(`${this.apiUrl}/categoriecartes/${CategoriesMirror.code}`, CategoriesMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('updatecategorie'))
  );
}

updatePolitique(politiqueMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/politiqueevaluations/${politiqueMirror.code}`, politiqueMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updatecategorie'))
    );
  }

/* GET heroes whose name contains search term */
searchcategorie(code: string): Observable<CategoriesMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new CategoriesMirror());
  }
  return this.http.get<CategoriesMirror>(`${this.apiUrl}/categoriecartes/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<CategoriesMirror>('searchcategorie'))
  );
}

/* GET heroes whose name contains search term */
deletecategorie(code: string): Observable<CategoriesMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new CategoriesMirror());
  }
  return this.http.delete<CategoriesMirror>(`${this.apiUrl}/categoriecartes/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<CategoriesMirror>('deletecategorie'))
  );
}

/*** initialisation d'un categorie ****/
setNewcategorie(categorie : CategoriesMirror){
  this.categorie = new CategoriesMirror(categorie.code, categorie.lebelle,
    categorie.periodicite, categorie.action, categorie.politiqueEvaluation,
    categorie.statut, categorie.commercant)
}

/*** initialisation d'un categorie ****/
setNewpolitqueEvaluation(politique : PolitiqueEvaluationsMirror){
  this.politque = new PolitiqueEvaluationsMirror(politique.code, politique.libele,
    politique.description)
}

/*** initialisation d'un categorie ****/
getCurrentcategorie(){
  return this.categorie;
}

  /*** initialisation d'un categorie ****/
  getCurrentPolitiqueEvaluation(){
    return this.politque;
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
