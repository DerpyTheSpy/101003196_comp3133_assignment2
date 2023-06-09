import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationguardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let url: string = state.url;
      let val = localStorage.getItem('token');

      if(val != null && val == "true"){
         if(url == "login"){
            return this.router.parseUrl('dashboard');
         }else{
            return true;
         }
      } else {
         return this.router.parseUrl('login');
      }      
  }

}