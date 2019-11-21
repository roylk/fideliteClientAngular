import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaysMirror,RegionMirror, VilleMirror } from '../clients/client.model';
import {environment} from '../../../environments/environment'
import {CommercantMirror} from '../commercants/commercant.model';

//import { RegionMirror } from '../clients/client.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class UtilitairesService {

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
  getEvaluationList(): Observable<any[]>  {
    return this.http.get<any[]>(this.apiUrl+'/politiqueevalutions')
      .pipe(tap(_ => console.log('service liste clients consommé avec succès')),
        catchError(this.handleError<any[]>('getMarchandList', []))
      ); //
  }

  /* GET list de la politique d'evalution,*/
  getAllCategories(): Observable<any[]>  {
    return this.http.get<any[]>(this.apiUrl+'/politiqueevalutions')
      .pipe(tap(_ => console.log('service liste categories consommé avec succès')),
        catchError(this.handleError<any[]>('getAllCategories', []))
      ); //
  }

  /* GET list de la politique d'evalution,*/
  getRegions(): Observable<any[]>  {
    return this.http.get<any[]>(this.apiUrl+'/regions');
      /* .pipe(tap(_ => console.log('service liste categories consommé avec succès')),
        catchError(this.handleError<any[]>('getAllCategories', []))
      ); // */
  }

  getVilles(): Observable<any[]>  {
    return this.http.get<any[]>(this.apiUrl+'/villes');
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
