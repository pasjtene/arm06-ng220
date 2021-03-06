import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export class UserCred {
  id: number;
  userName: string;
  password: string;
}

@Component({
  moduleId: module.id,
  selector: 'arm-login',
  templateUrl: 'login.comp.html',
  styleUrls: ['login.comp.css']
})

export class LoginComponent implements OnInit {
  public userLoggedIn$: EventEmitter<string>;
  message: string;
  newUserWelcomeMessage: string = "";
  isAnewUser: boolean = false;

  constructor(public authService: AuthService, public router: Router){
    this.setMessage();
  }

  userCred: UserCred = {
    id: 0,
    userName: '',
    password: ''
  };

  setMessage(){
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'In' : 'Out');
  }

  ngOnInit() {
    this.newUserWelcomeMessage = this.authService.newUserWelcomeMessage;
    this.isAnewUser = this.authService.isAnewUser;
  }

  login(userName, password) {
    this.message = 'Trying to log in ...';
    this.authService.login(userName, password).subscribe(() => {
      this.setMessage();
      if(this.authService.isLoggedIn) {
        this.authService.isAnewUser = false;
        this.authService.authUserName = userName;
        localStorage.setItem('userName', userName);
        console.log("in Login...",this.authService.authUserName);
        //If no redirect was set, use the defautl
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl: '/users';
        //redirect the user to the target URL
        this.router.navigate([redirect]).then(() =>{
          this.authService.isLoggedIn = true;
          this.authService.authUserName = userName;
        });
      }else{
        this.authService.authFailed = true;
      }
    }, err => {
      this.authService.authFailed = true;
    });
  }

  logout() {
    this.authService.isLoggedIn = false;
    this.authService.authFailed = false;
    this.authService.isAnewUser = false;
    this.isAnewUser = false;
    this.authService.logout();
    this.setMessage();
  }

  /*When a non authenticated user clicks the create
    your account link / button on login page
  */
  createNewUser() {
    this.router.navigate(["/users"]);
  }
}
