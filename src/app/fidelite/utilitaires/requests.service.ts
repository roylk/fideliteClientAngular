import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PaysMirror, RegionMirror, Reponse, VilleMirror} from '../clients/client.model';
import {environment} from '../../../environments/environment'
import {CommercantMirror} from '../commercants/commercant.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl = environment.apiUrl; //'http://localhost:8080/ufifidelite/api';

  constructor( private http:HttpClient) { }

  //for observable use in real distant service
  getPays(): Observable<PaysMirror[]>  {
    
   return this.http.get<PaysMirror[]>(this.apiUrl+'/payss')
   .pipe(tap(_ => console.log('service liste clients consommé avec succès')),
   catchError(this.handleError<PaysMirror[]>('getPays', []))
     
   ); //
 }

   /** POST: add a new eleve to the server */
   addClient(PaysMirror: PaysMirror): Observable<PaysMirror> {
    return this.http.post<PaysMirror>(this.apiUrl +'/client', PaysMirror, httpOptions).pipe(
      tap((newPaysMirror: PaysMirror) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ id=${newPaysMirror.code}`)),
      catchError(this.handleError<PaysMirror>('addClient'))
    );
  }

  /* GET heroes whose name contains search term */
  getRegionByPays(codeP: string): Observable<RegionMirror> {
    if (!codeP.trim()) {
      // if not search term, return empty hero array.
      return of(new RegionMirror());
    }
    return this.http.get<RegionMirror>(`${this.apiUrl}/regionparpays?codeP=${codeP}`).pipe(
      tap(_ => console.log(`found Regions matching "${codeP}"`)),
      catchError(this.handleError<RegionMirror>('getRegionByPays'))
    );
  }



  /* GET heroes whose name contains search term */
  getVilleByRegion(codeR: string): Observable<VilleMirror> {
    if (!codeR.trim()) {
      // if not search term, return empty hero array.
      return of(new VilleMirror());
    }
    return this.http.get<VilleMirror>(`${this.apiUrl}/villeparregion?codeR=${codeR}`).pipe(
      tap(_ => console.log(`found Regions matching "${codeR}"`)),
      catchError(this.handleError<VilleMirror>('getVilleByRegion'))
    );
  }

  /* GET list marchands*/
  getMarchandList(): Observable<CommercantMirror[]>  {

    return this.http.get<CommercantMirror[]>(this.apiUrl+'/commercants')
      .pipe(tap(_ => console.log('service liste clients consommé avec succès')),
        catchError(this.handleError<CommercantMirror[]>('getMarchandList', []))

      );
  }

  /* GET list de la politique d'evalution,*/
  getEvaluationList(): Observable<any>  {
    return this.http.get<any>(this.apiUrl+'/politiqueevaluations')
      .pipe(tap(_ => console.log('service liste clients consommé avec succès')),
        catchError(this.handleError<any>('getMarchandList', []))
      ); //
  }

  /* GET list de la politique d'evalution,*/
  getAllCategories(): Observable<any>  {
    return this.http.get<any>(this.apiUrl+'/categoriecartesR')
      .pipe(tap(_ => console.log('service liste categories consommé avec succès')),
        catchError(this.handleError<any[]>('getAllCategories', []))
      ); //
  }

  /* GET list de la politique d'evalution,*/
  getAllOffres(): Observable<any>  {
    return this.http.get<any>(this.apiUrl+'/offresR')
      .pipe(tap(_ => console.log('service liste offres consommé avec succès')),
        catchError(this.handleError<any[]>('getAllOffres', []))
      ); //
  }

  /* GET list de la politique d'evalution,*/
  getAllPaliers(): Observable<any>  {
    return this.http.get<any>(this.apiUrl+'/paliersR')
      .pipe(tap(_ => console.log('service liste paliers consommé avec succès')),
        catchError(this.handleError<any[]>('getAllOffres', []))
      ); //
  }

  /* GET list de la politique d'evalution,*/
  getAllTypeoffres(): Observable<any>  {
    return this.http.get<any>(this.apiUrl+'/typeoffresR')
      .pipe(tap(_ => console.log('service liste type offre consommé avec succès')),
        catchError(this.handleError<any[]>('getAllTypeoffres', []))
      );
  }


  /* GET list de la politique d'evalution,*/
  getAllEvaluationPolicies(): Observable<any>  {
    return this.http.get<any>(this.apiUrl+'/politiqueevaluationsR')
      .pipe(tap(_ => console.log('service liste categories consommé avec succès')),
        catchError(this.handleError<any[]>('getAllEvaluationPolicies', []))
      ); //
  }

  //for observable use in real distant service
  getAllClients(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
    //  this.messageService.add('HeroService: fetched heroes');
    // this.messageService.add('HeroService: fetched heroes');
    // return of (HEROES);
    return this.http.get<Reponse>(this.apiUrl+'/clientsR')
      .pipe(tap(_ => console.log('service liste clients consommé avec succès')),
        catchError(this.handleError<Reponse>('getAllClients'))

      ); //
  }

  //for observable use in real distant service
  getAllCartes(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
    //  this.messageService.add('HeroService: fetched heroes');
    // this.messageService.add('HeroService: fetched heroes');
    // return of (HEROES);
    return this.http.get<Reponse>(this.apiUrl+'/cartesR')
      .pipe(tap(_ => console.log('service liste Carte consommé avec succès')),
        catchError(this.handleError<Reponse>('getAllCarte'))

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

  //for observable use in real distant service
  getAllPointesDeVentes(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
    //  this.messageService.add('HeroService: fetched heroes');
    // this.messageService.add('HeroService: fetched heroes');
    // return of (HEROES);
    return this.http.get<Reponse>(this.apiUrl+'/pointsdeventeR')
      .pipe(tap(_ => console.log('service liste Commercants consommé avec succès')),
        catchError(this.handleError<Reponse>('getAllPointesDeVentes'))

      ); //
  }

  //for observable use in real distant service
  getAllTerminaux(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
    //  this.messageService.add('HeroService: fetched heroes');
    // this.messageService.add('HeroService: fetched heroes');
    // return of (HEROES);
    return this.http.get<Reponse>(this.apiUrl+'/terminalsR')
      .pipe(tap(_ => console.log('service liste Commercants consommé avec succès')),
        catchError(this.handleError<Reponse>('getAllTerminaux'))

      ); //
  }

  //for observable use in real distant service
  getAllConversions(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
    //  this.messageService.add('HeroService: fetched heroes');
    // this.messageService.add('HeroService: fetched heroes');
    // return of (HEROES);
    return this.http.get<Reponse>(this.apiUrl+'/conversionsR')
      .pipe(tap(_ => console.log('service liste Commercants consommé avec succès')),
        catchError(this.handleError<Reponse>('getAllConversions'))

      ); //
  }

  //for observable use in real distant service
  getAllTransactions(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
    //  this.messageService.add('HeroService: fetched heroes');
    // this.messageService.add('HeroService: fetched heroes');
    // return of (HEROES);
    return this.http.get<Reponse>(this.apiUrl+'/transactionsR')
      .pipe(tap(_ => console.log('service liste Commercants consommé avec succès')),
        catchError(this.handleError<Reponse>('getAllTransactions'))

      ); //
  }

   /* GET list des utilisateurs*/
   getAllUsers(): Observable<any>  {
    return this.http.get<any>(this.apiUrl+'/utilisateursR')
      .pipe(tap(_ => console.log('service liste offres consommé avec succès')),
        catchError(this.handleError<any[]>('getAllUsers', []))
      ); //
  }





  //for observable use in real distant service
  getAllPageELements(methodd, numeroPage , sizePage): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
    //  this.messageService.add('HeroService: fetched heroes');
    // this.messageService.add('HeroService: fetched heroes');
    // return of (HEROES);
    return this.http.get<Reponse>(this.apiUrl+'/'+methodd+'?page='+numeroPage+'&size='+sizePage)
      .pipe(tap(_ => console.log('service liste  consommé avec succès')),
        catchError(this.handleError<Reponse>('getAllClients'))

      ); //
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
