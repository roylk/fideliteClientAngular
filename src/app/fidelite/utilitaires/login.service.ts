import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PaysMirror, RegionMirror, Reponse, VilleMirror} from '../clients/client.model';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl; 

  constructor( private http:HttpClient) { }

  connexion(login:any ): Observable<any>  {
    return this.http.post<any>(this.apiUrl+'/login',login)
      .pipe(tap(_ => console.log('service login consommé avec succès')),
        catchError(this.handleError<any[]>('connexion', []))
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
