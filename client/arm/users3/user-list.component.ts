import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { User } from './user';
import { UserService } from './user.service';



@Component({
  moduleId: module.id,
  selector: 'arm-users',
  templateUrl: 'users.component.html',
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .users {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 35em;
    }
    .users li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .users li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .users li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .users .text {
      position: relative;
      top: -3px;
    }
    .users .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  providers: [UserService]
})

export class UserListComponent implements OnInit {
  usersTitle = " Click a user to view and update details";
  users : User[];
  selectedUser: User;
  private selectedId: number;

  constructor(
    private router: Router,
    private userService: UserService) {}

  getUsers(): void {
    this.userService.getUsers().then(users => {
      this.users = users;
      console.log("Users: ", users);
    });

  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  isSelected(user: User) {
    return user.id === this.selectedId;
  }

  gotoDetail(): void{
    this.router.navigate(['/users', this.selectedUser._id]);
  }


  add2(firstName: string, userName: string, password: string): void {
    var firstName = firstName.trim();
    var password = password.trim();
    var userName = userName.trim();

    if(!firstName || !password) {
      return;
    }
    this.userService.create2(firstName, userName, password)
    .then(user => {
      console.log("Pushing users: "+user);
      this.users.push(user);
      this.selectedUser = null;
    });
  }

  delete(user: User): void {
    this.userService
    .delete(user.id)
    .then(() => {
      this.users = this.users.filter(h => h !== user );
      if (this.selectedUser === user ) {
        this.selectedUser = null;
      }
    })
  }

  delete2(user: User): void {
    console.log("deleting user....: "+JSON.stringify(user));
    this.userService
    .delete2(user._id)
    .then(() => {
      this.users = this.users.filter(h => h !== user );
      if (this.selectedUser === user ) {
        this.selectedUser = null;
      }
    })
  }

}
