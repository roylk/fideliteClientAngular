import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientMirror,Reponse} from './client.model';
import { UtilitairesService } from '../utilitaires/utilitaires.service';
import {environment} from '../../../environments/environment'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = environment.apiUrl ;//'http://localhost:8080/ufifidelite/api';  // URL to web api

  private client : ClientMirror;

  constructor(private http :HttpClient, private utilitairesService:UtilitairesService) { }

  //for observable use in real distant service
  getClients(): Observable<ClientMirror[]>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<ClientMirror[]>(this.apiUrl+'/clients')
   .pipe(tap(_ => console.log('service liste clients consommé avec succès')),
   catchError(this.handleError<ClientMirror[]>('getClients', []))
     
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

 /** POST: add a new eleve to the server */
 addClient(clientMirror): Observable<any> {
  return this.http.post(this.apiUrl +'/client', clientMirror, httpOptions);
}

updateClient(clientMirror): Observable<Reponse> {
  return this.http.put(`${this.apiUrl}/clients/${clientMirror.code}`, clientMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('updateClient'))
  );
}

/* GET heroes whose name contains search term */
searchClient(code: string): Observable<ClientMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new ClientMirror());
  }
  return this.http.get<ClientMirror>(`${this.apiUrl}/clients/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<ClientMirror>('searchClient'))
  );
}

/* GET heroes whose name contains search term */
deleteClient(code: string): Observable<ClientMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new ClientMirror());
  }
  return this.http.delete<ClientMirror>(`${this.apiUrl}/clients/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<ClientMirror>('deleteClient'))
  );
}

/*** initialisation d'un client ****/
setNewClient(client : ClientMirror){
  this.client = new ClientMirror(client.code,client.titre, client.nom, client.prenom, 
    client.dateNaissance, client.telephone1, client.telephone2, client.adresse,
     client.email, client.statut, client.ville)
}

/*** initialisation d'un client ****/
getCurrentClient(){
  return this.client;
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
