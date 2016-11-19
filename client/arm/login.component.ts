import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export class UserCred {
  id: number;
  userName: string;
  password: string;
}

@Component({
  moduleId: module.id,
  selector: 'arm-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.comp.css']
})

export class LoginComponent {
  message: string;

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
/*
  login() {
    this.message = 'Trying to log in ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if(this.authService.isLoggedIn) {
        //If no redirect was set, use the defautl
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl: '/crisis-center/admin';
        //redirect the user to the target URL
        this.router.navigate([redirect]);
      }
    })
  }
*/
  login(userName, password) {
    this.message = 'Trying to log in ...';
    this.authService.login(userName, password).subscribe(() => {
      this.setMessage();
      if(this.authService.isLoggedIn) {
        //If no redirect was set, use the defautl
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl: '/users';
        //redirect the user to the target URL
        this.router.navigate([redirect]).then(() =>{
          this.authService.isLoggedIn = true;
        });
      }else{
        console.log("setting authFailed...")
        this.authService.authFailed = true;
      }
    }, err => {
      console.log(err);
      console.log("setting authFailed...")
      this.authService.authFailed = true;
    });
  }

  logout() {
    this.authService.isLoggedIn = false;
    this.authService.authFailed = false;
    this.authService.logout();
    this.setMessage();
  }
}