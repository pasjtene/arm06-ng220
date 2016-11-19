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
  title = " Welcome to ARM: Advanced Risk Manager";
  //users : User[];
  //selectedUser: User;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  isLoggedIn = this.authService.isLoggedIn;
  //getUsers(): void {
    //this.userService.getUsers().then(users => this.users = users);
  //}


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

  //onSelect(user: User): void {
    //this.selectedUser = user;
//  }
}
