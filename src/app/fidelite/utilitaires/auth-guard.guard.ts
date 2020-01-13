import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
//import { parse } from 'path';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private loginService: LoginService 
) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url : string =state.url;

    return this.checkLogin(url);
  }

  checkLogin(url : string): boolean{
      if(this.login()){return true}
      this.router.navigate(['/login']);
      return false;
    }

  login(){
    if(JSON.parse(localStorage.getItem('user')) !=null){
      return true
    }else{
      return false
    }
  }
  
  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }
}
