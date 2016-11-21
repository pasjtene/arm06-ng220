import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { User } from './user';
import { AuthService } from './auth.service';



@Component({
  moduleId: module.id,
  selector: 'arm-main',
  templateUrl: 'arm.component.html',
  styleUrls: ['arm.component.css']
})

export class ArmComponent implements OnInit{
  title = " Welcome to ARM: Asset and Risk Manager software";

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  isLoggedIn = this.authService.isLoggedIn;

  ngOnInit(): void {
  this.authService.checkAuthToken().then(() =>{
    this.isLoggedIn = this.authService.isLoggedIn;

    //Uncomment the following to enable loggin for all links.
    //if(!this.isLoggedIn){
    //  this.router.navigate(['/login']);
  //  }
  } );
  }

  logout() {
    this.authService.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login']).then(() =>{
      this.isLoggedIn = false;
    });
    //this.setMessage();
  }

}
