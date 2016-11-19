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
  //The we run the request later for server side validation of the token.
  //iF validation failes, the user should be immediately looged out.
  if (localStorage.getItem('arm_auth_token') === null) {
    console.log("Auth Toke is null ...again");
      this.isLoggedIn = false;
      //return false;
  } else  {
     this.isLoggedIn = true;
  }
  //console.log("In CheckUth the headers are:  "+JSON.stringify(this.headers));
  return this.http.post(this.authCheckUrl, {headers: this.headers})
  .toPromise()
  .then(res => {
    //console.log("In check Auth got a responses: " +res.json());
    if(res.json().token !== "false"){
      console.log("In check Auth got a positive responses: " +res.json().token);
      this.isLoggedIn = true;
      //return true;
    } else {
      console.log("In check Auth got a negative responses: " +res.json().token);
      this.isLoggedIn = false;
      //return false;
    }

  })
  .catch( error => {
    this.isLoggedIn = false;
    console.log("In check Auth No Response");
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
      console.log("setting authFailed...")
      this.authFailed = true;
      return res;
    }
  });

  }

  logout(): void {
    localStorage.removeItem('arm_auth_token');
    console.log("Logging Out in auth service...")
    this.isLoggedIn = false;
    this.authFailed = false;

  }
}
