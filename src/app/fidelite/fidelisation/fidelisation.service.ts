import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {OffreMirror, PalierMirror, Reponse, TypeOffreMirror, UserMirror} from './fidelisation.model';
import { UtilitairesService } from '../utilitaires/utilitaires.service';
import {environment} from '../../../environments/environment'
import {PaysMirror, RegionMirror,VilleMirror} from '../clients/client.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FidelisationService {

  private apiUrl = environment.apiUrl ;//'http://localhost:8080/ufifidelite/api';  // URL to web api
  private offre : OffreMirror;
  private palier : PalierMirror;
  private typeOffre : TypeOffreMirror;
  private pays : PaysMirror;
  private region: RegionMirror;
  private ville: VilleMirror;
  private utilisateur: UserMirror;

  constructor(private http :HttpClient, private utilitairesService:UtilitairesService) { }

  //for observable use in real distant service
  getoffres(): Observable<OffreMirror[]>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<OffreMirror[]>(this.apiUrl+'/offres')
   .pipe(tap(_ => console.log('service liste offres consommé avec succès')),
   catchError(this.handleError<OffreMirror[]>('getoffres', []))
     
   ); //
 }

  //for observable use in real distant service
  getAlloffres(): Observable<Reponse>  {
    // TODO: send the message _after_ fetching the heroes
   //  this.messageService.add('HeroService: fetched heroes');
   // this.messageService.add('HeroService: fetched heroes');
   // return of (HEROES);
   return this.http.get<Reponse>(this.apiUrl+'/offresR')
   .pipe(tap(_ => console.log('service liste offres consommé avec succès')),
   catchError(this.handleError<Reponse>('getAlloffres'))
     
   ); //
 }

 /** POST: add a new eleve to the server */
 addoffre(OffreMirror): Observable<Reponse> {
  return this.http.post(this.apiUrl +'/offre', OffreMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('addoffre'))
  );
}
  /** POST: add a new eleve to the server */
  addTypeOffre(typeOffreMirror): Observable<Reponse> {
    return this.http.post(this.apiUrl +'/typeoffre', typeOffreMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addoffre'))
    );
  }

  /** POST: add a new eleve to the server */
  addPays(paysMirror): Observable<any> {
    return this.http.post(this.apiUrl +'/pays', paysMirror, httpOptions);
    /* .pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addoffre'))
    ) */
  }

   /** POST: add a new eleve to the server */
   addRegion(regionMirror): Observable<any> {
    return this.http.post(this.apiUrl +'/region', regionMirror, httpOptions);
    /* .pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addoffre'))
    ) */
  }

  addVille(villeMirror): Observable<any> {
    return this.http.post(this.apiUrl +'/ville', villeMirror, httpOptions);
  }
  /** POST: add a new eleve to the server */
  addPalier(palierMirror): Observable<Reponse> {
    return this.http.post(this.apiUrl +'/palier', palierMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ statut=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('addoffre'))
    );
  }

updateoffre(OffreMirror): Observable<Reponse> {
  return this.http.put(`${this.apiUrl}/offres/${OffreMirror.id}`, OffreMirror, httpOptions).pipe(
    tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
    catchError(this.handleError<Reponse>('updateoffre'))
  );
}

updatePalier(palierMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/paliers/${palierMirror.id}`, palierMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateoffre'))
    );
  }

  updateTypeOffre(typeOffreMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/typeoffres/${typeOffreMirror.code}`, typeOffreMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateoffre'))
    );
  }

  updatePays(paysMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/payss/${paysMirror.code}`, paysMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateoffre'))
    );
  }

  updateRegion(regionMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/regions/${regionMirror.id}`, regionMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateoffre'))
    );
  }

  updateVille(villeMirror): Observable<Reponse> {
    return this.http.put(`${this.apiUrl}/villes/${villeMirror.id}`, villeMirror, httpOptions).pipe(
      tap((newReponse: Reponse) => console.log(`EndPoint Creer Eleve consomme avec Succes w/ status=${newReponse.status}`)),
      catchError(this.handleError<Reponse>('updateVille'))
    );
  }


  /* GET heroes whose name contains search term */
searchoffre(code: string): Observable<OffreMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new OffreMirror());
  }
  return this.http.get<OffreMirror>(`${this.apiUrl}/offres/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<OffreMirror>('searchoffre'))
  );
}

/* GET heroes whose name contains search term */
deleteoffre(code: string): Observable<OffreMirror> {
  if (!code.trim()) {
    // if not search term, return empty hero array.
    return of(new OffreMirror());
  }
  return this.http.delete<OffreMirror>(`${this.apiUrl}/offres/${code}`).pipe(
    tap(_ => console.log(`found heroes matching "${code}"`)),
    catchError(this.handleError<OffreMirror>('deleteoffre'))
  );
}

/*** initialisation d'un offre ****/
setNewoffre(offre : OffreMirror){
  this.offre = new OffreMirror(offre.id, offre.code,offre.libele, offre.orientation, offre.dateDebut, offre.dateFin, offre.statut, offre.categorieCarte, offre.typeOffre)
}

  /*** initialisation d'un Palier ****/

  setNewPalier(palier : PalierMirror){
    this.palier = new PalierMirror(palier.id, palier.montantInf, palier.montantSup, palier.uniteDevise, palier.unitePoint, palier.offre)
  }

  setNewTypeOffre(typeOffre : TypeOffreMirror){
    this.typeOffre = new TypeOffreMirror(typeOffre.id, typeOffre.code, typeOffre.libelle, typeOffre.description)
  }

  setNewPays(paysMirror : PaysMirror){
    this.pays = new PaysMirror(paysMirror.code, paysMirror.nom, paysMirror.dateCreation, paysMirror.description)
  }

  setNewRegion(regionMirror : RegionMirror){
    this.region = new RegionMirror(regionMirror.id,regionMirror.code, regionMirror.nom, regionMirror.dateCreation, regionMirror.pays, regionMirror.description)
  }

  setNewVille(villeMirror : VilleMirror){
    this.ville = new VilleMirror(villeMirror.id,villeMirror.code, villeMirror.nom, villeMirror.dateCreation, villeMirror.region, villeMirror.description)
  }

  setNewUtilisateur(userMirror: UserMirror){
    this.utilisateur = new UserMirror(userMirror.id,userMirror.nom, userMirror.prenom, userMirror.telephone, userMirror.email, userMirror.login,userMirror.motDePasse, userMirror.sexe, userMirror.statut, userMirror.commercant,userMirror.role )
  }


/*** initialisation d'un offre ****/
getCurrentOffre(){
  return this.offre;
}

  /*** initialisation d'un offre ****/
  getCurrentPalier(){
    return this.palier;
  }

  /*** initialisation d'un offre ****/
  getCurrentTypeOffre(){
    return this.typeOffre;
  }

  /*** initialisation d'un offre ****/
  getCurrentPays(){
    return this.pays;
  }

   /*** initialisation d'un offre ****/
   getCurrentRegion(){
    return this.region;
  }

  getCurrentVille(){
    return this.ville;

  }

  getCurrentUtilisateur(){
    return this.utilisateur;

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
