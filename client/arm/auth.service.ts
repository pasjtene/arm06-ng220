import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import {UserCredentials} from './users/user';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  authFailed: boolean = false;
  newUserWelcomeMessage: string = "";
  isAnewUser: boolean = false;
  isAuthenticated: string = localStorage.getItem('arm_auth_token');
  // the user remains logged in untill they click logout
  //isLoggedIn : boolean;
  //isLoggedIn = localStorage.getItem('auth_token') === 'jtp123' ? true : false;
  private loginUrl = '/auth/login';
  private authCheckUrl = '/auth/auth_check';
  private headers = new Headers({'Conten-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token'), 'userName': localStorage.getItem('userName')});
  constructor(private http: Http){}
  //store the URL for future redirections
  redirectUrl: string;

  //login5(): Observable<boolean> {
    //const url = `${this.authCheckUrl}/${userName}/${password}`;
    //const url = `${this.authCheckUrl}`;
    //console.log("Loging in in service");
    //var resp = this.http.get(url).map((r: Response) => r.json());
    //console.log("the response is "+ resp);
 //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
 //}


checkAuthToken(): Promise<void>{
  //auth_token = localStorage.getItem('auth_token');
  //if the auth token is set, we authenticate the user.
  //We run the request later for server side validation of the token.
  //iF validation failes, the user should be immediately looged out.
  if (localStorage.getItem('arm_auth_token') === null) {
      this.isLoggedIn = false;
  } else  {
     this.isLoggedIn = true;
  }
  return this.http.post(this.authCheckUrl, {headers: this.headers})
  .toPromise()
  .then(res => {

    if(res.json().token !== "false"){
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  })
  .catch( error => {
    this.isLoggedIn = false;
  });

}


  login(userName, password): Observable<Response> {
    return this.http.post(this.loginUrl, {userName, password}, {headers: this.headers})
    .map(res => {
      return res.json();
    })
    .map((res) => {
      if(res){
      this.isLoggedIn = true;
      localStorage.setItem('arm_auth_token', res.token);
      localStorage.setItem('userName', userName);
      return res;
    } else {
      this.isLoggedIn = false;
      this.authFailed = true;
      return res;
    }
  });

  }

  logout(): void {
    localStorage.removeItem('arm_auth_token');
    this.isLoggedIn = false;
    this.authFailed = false;

  }
}
