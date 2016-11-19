import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor (private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log('AuthGuard#canActivate called... great');
    console.log("In Auth guard service is logged in value: "+ this.authService.isLoggedIn);
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    
    if(this.authService.isLoggedIn) {
      return true;
    }


    //store to url where the user is trying to go
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
