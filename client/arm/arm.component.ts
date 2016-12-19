import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { User } from './user';
import { AuthService } from './auth.service';

function showDate() {
  //showdateandTime is a closure as it contains a function.
  // this function is run at the interval 1000 to return the time
  var showDateAndTime = getDate();
    window.setInterval(showDateAndTime, 1000);
}

//getDate creates a closure by returning a function
function getDate() {
  return function () {
  var date_ = new Date().toString();
  document.getElementById("date_").innerHTML = date_.substring(0,15);
  document.getElementById("time_").innerHTML = date_.substring(16,28);
}
}


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
  ) {
    showDate();
  }

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
