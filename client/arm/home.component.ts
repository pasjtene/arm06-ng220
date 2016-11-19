import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './users/user';
import { UserService } from './users/user.service';
import { HelloAngular2 } from './d3ng/hello-angular2';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'arm-home',
  //directives: [HelloAngular2],
  templateUrl: 'home.comp.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService){

    }

  ngOnInit(): void {
    this.userService.getUsers()
    .then(users => this.users = users.slice(1, 5));
  }

  gotoDetail(user: User): void {
    let link = ['/user', user.id];
    this.router.navigate(link);
  }

  digGreet(value) {
    console.log(value);
  }

}
