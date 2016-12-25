import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import {UserCredentials, User} from './users/user';


@Injectable()
export class AuthService {
  public userLoggedIn$: EventEmitter<User>;
  isLoggedIn: boolean = false;
  authFailed: boolean = false;
  newUserWelcomeMessage: string = "";
  isAnewUser: boolean = false;
  isAuthenticated: string = localStorage.getItem('arm_auth_token');
  authUserName: string = "";
  // the user remains logged in untill they click logout
  //isLoggedIn : boolean;
  //isLoggedIn = localStorage.getItem('auth_token') === 'jtp123' ? true : false;
  private loginUrl = '/auth/login';
  private authCheckUrl = '/auth/auth_check';
  private headers = new Headers({'Conten-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token'), 'userName': localStorage.getItem('userName')});
  //store the URL for future redirections
  redirectUrl: string;

  constructor(private http: Http){
    this.userLoggedIn$ = new EventEmitter();
  }




checkAuthToken(): Promise < void>{
    //arm_auth_token is set when the user logs in
    //if the auth token is set, we authenticate the user.
    //We run the request later for server side validation of the token.
    //iF validation failes, the user should be immediately looged out.
    if(localStorage.getItem('arm_auth_token') === null) {
        this.isLoggedIn = false;
    } else  {
        this.isLoggedIn = true;
        this.authUserName = localStorage.getItem("userName");
    }
  return this.http.post(this.authCheckUrl, { headers: this.headers })
        .toPromise()
        .then(res => {
            if (res.json().token !== "false") {
                this.isLoggedIn = true;
                //this event is subscribed to and used in arm.component.ts to set the loggedin user details.
                this.userLoggedIn$.emit(res.json().user);
            } else {
                this.isLoggedIn = false;
            }
        })
        .catch(error => {
            this.isLoggedIn = false;
        });
}

login(userName, password): Observable < Response > {
    return this.http.post(this.loginUrl, { userName, password }, { headers: this.headers })
        .map(res => {
            return res.json();
        })
        .map((res) => {
            if (res) {
                this.isLoggedIn = true;
                localStorage.setItem('arm_auth_token', res.token);
                localStorage.setItem('userName', userName);
                //an even is emitter on user login with the user object.
                //this event is subscribed to and used in arm.component.ts to set the loggedin user details.
                this.userLoggedIn$.emit(res.user);
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
    localStorage.removeItem('userName');
    this.isLoggedIn = false;
    this.authFailed = false;

  }
}
