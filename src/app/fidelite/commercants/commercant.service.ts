import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CommercantMirror, PointsDeVenteMirror, TerminalMirror, Reponse, ConversionMirror} from './commercant.model';
import { UtilitairesService } from '../utilitaires/utilitaires.service';
import {environment} from '../../../environments/environment'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CommercantsService {

  private apiUrl = environment.apiUrl; //'http://localhost:8080/ufifidelite/api';  // URL to web api

  private commercant : CommercantMirror;

  private pointDeVente : PointsDeVenteMirror;
  private terminal : TerminalMirror;
  private conversion : ConversionMirror;

  constructor(private http :HttpClient, private utilitairesService:UtilitairesService) { }

  //for observable use in real distant service
  getCommercants(): Observable<CommercantMirror[]>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<CommercantMirror[]>(this.apiUrl+'/commercants')
   .pipe(tap(_ => console.log('service liste Commercants consommé avec succès')),
   catchError(this.handleError<CommercantMirror[]>('getCommercants', []))
     
   ); //
 }

  //for observable use in real distant service
  getAllCommercants(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<Reponse>(this.apiUrl+'/commercantsR')
   .pipe(tap(_ => console.log('service liste Commercants consommé avec succès')),
   catchError(this.handleError<Reponse>('getAllCommercants'))
     
   ); //
 }

 /** POST: add a new eleve to the server */
 addCommercant(CommercantMirror): Observable<Reponse> {
  return this.http.post(this.apiUrl +'/commercant', CommercantMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('addCommercant'))
  );
}

  /** POST: add a new eleve to the server */
  addTerminal(TerminalMirror): Observable<Reponse> {
    return this.http.post(this.apiUrl +'/terminal', TerminalMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addCommercant'))
    );
  }


  /** POST: add a new eleve to the server */
  addConversion(conversionMirror): Observable<Reponse> {
    return this.http.post(this.apiUrl +'/conversion', conversionMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addConversion'))
    );
  }


  /** POST: add a new eleve to the server */
  addPointDeVente(pointsDeVenteMirror): Observable<Reponse> {
    return this.http.post(this.apiUrl +'/pointdevente', pointsDeVenteMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addPointDeVente'))
    );
  }

  updateCommercant(commercantMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/commercants/${commercantMirror.code}`, commercantMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateCommercant'))
    );
  }

  updatePointDeVente(pointsDeVenteMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/pointsdevente/${pointsDeVenteMirror.code}`, pointsDeVenteMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateCommercant'))
    );
  }


  updateTerminal(pointsDeVenteMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/terminals/${pointsDeVenteMirror.code}`, pointsDeVenteMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateCommercant'))
    );
  }

  updateConversion(conversionMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/conversions/${conversionMirror.id}`, conversionMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateCommercant'))
    );
  }


  /* GET heroes whose name contains search term */
searchCommercant(code: string): Observable<CommercantMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new CommercantMirror());
  }
  return this.http.get<CommercantMirror>(`${this.apiUrl}/Commercants/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<CommercantMirror>('searchCommercant'))
  );
}

/* GET heroes whose name contains search term */
deleteCommercant(code: string): Observable<CommercantMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new CommercantMirror());
  }
  return this.http.delete<CommercantMirror>(`${this.apiUrl}/commercants/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<CommercantMirror>('deleteCommercant'))
  );
}

/*** initialisation d'un Commercant ****/
setNewCommercant(commercant : CommercantMirror){
  this.commercant = new CommercantMirror(commercant.code,commercant.acronyme, commercant.nom,
     commercant.telephone1, commercant.telephone2, commercant.adresse,
     commercant.email, commercant.statut, commercant.ville)
}

  /*** initialisation d'un Commercant ****/
  setNewPointDeVente(pointDeVente: PointsDeVenteMirror){
    this.pointDeVente = new PointsDeVenteMirror(pointDeVente.code,pointDeVente.acronyme,
      pointDeVente.nom, pointDeVente.adresse,
      pointDeVente.email, pointDeVente.telephone1, pointDeVente.telephone2,
      pointDeVente.statut, pointDeVente.commercantCode,  pointDeVente.ville)
  }

  /*** initialisation d'un Commercant ****/
  setNewTerminal(terminal: TerminalMirror){
    this.terminal = new TerminalMirror(terminal.code, terminal.designation, terminal.numeroSerie, terminal.pointDeVente, terminal.statut)
  }


  /*** initialisation d'un Commercant ****/
  setNewConversion(conversion: ConversionMirror){
    this.conversion = new ConversionMirror(conversion.id, conversion.nbpointInf, conversion.nbpointSup, conversion.reduction, conversion.type, conversion.commercant)
  }


  /*** initialisation d'un Commercant ****/
getCurrentCommercant(){
  return this.commercant;
}

/*** initialisation d'un Commercant ****/
  getCurrentPointDeVente(){
    return this.pointDeVente;
  }

  /*** initialisation d'un Commercant ****/
  getCurrentTerminal(){
    return this.terminal;
  }

  /*** initialisation d'un Commercant ****/
  getCurrentConversion(){
    return this.conversion;
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
