/*
*Author: Pascal Tene
*Created: Sept 2016
*last Updated: Nov 06, 2016
*/
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
//import { Asset } from './userj';
import { User } from './user';
import { UserService } from './user.service';
import { Location } from '../locations/location';
import { LocationService } from '../locations/location.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';


@Component({
  selector: 'confirm-delete-dialog',
  template: `
  <h3> Delete this user ?: {{ userToDelete.firstName }} {{ userToDelete.lastName }} </h3>
  <p>Click yes to permanently delete the asset </p>
  <button class="btn btn-success" (click)="dialogRef.close() " >Cancel</button> <button class="btn btn-danger" (click)="dialogRef.close('Yes')">Yes delete</button>
  `
})

export class ConfirmDeleteUserComponent implements OnInit {
  userToDelete = {};

  constructor(
    private userService: UserService,
    public dialogRef: MdDialogRef<any>
  ){}

  ngOnInit() : void {
    this.userToDelete = this.userService.userToDelete;
    console.log("Init confirm delete: ", this.userToDelete);
  }
}



@Component({
    moduleId: module.id, //this is required for the template and css to load from html or css file
    selector: 'manage-asset',
    templateUrl: 'user.comp.html',
    styleUrls: ['user.comp.css']
})

export class UserComponent implements OnInit {
    currentUser = {};
    locations: Location[];
    //assets: Asset[];
    users: User[];
    dialogRef: MdDialogRef<any>;
    mouseIn = 100;
    mouseOnButton = 100;
    confirmPassword = '';
    passwordMissMatch = '';
    //userExist = false;
    userNameExist = '';

    @ViewChild('sidenav') sidenav: MdSidenav;
    @ViewChild('createUserSidenav') createUserSidenav: MdSidenav;
    newUser: User = {
      id: 0,
      _id: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      location: '',
    };

    constructor(
        private locationService: LocationService,
        //private assetService: UserjService,
        private userService: UserService,
        private router: Router,
        public viewContainerRef: ViewContainerRef,
        public dialog: MdDialog

    ) { }

    mover(i) {
        this.mouseIn = i;
    }

    mout() {

        this.mouseIn = 100;

    }

    setMouseOnButton(i) {
      this.mouseOnButton = i;
    }

    unSetMouseOnButton() {
      this.mouseOnButton = 100;
    }

    getLocations(): void {
        this.locationService.getLocations().then((locations) => {
            this.locations = locations;
        })
    }

    getUsers(): void {
      this.userService.getUsers().then(users => {
        this.users = users;
        console.log("Users: ", users);
      });

    }

  //  getAssets(): void {
        //this.assetService.getAssets().then((assets) => {
        //  console.log("Assets from server: ", assets)
          //  this.assets = assets;
      //  })
  //  }


    delete(user: User): void {
      this.userService
      .delete(user._id)
      .then(() => {
        this.users = this.users.filter(h => h !== user );
        this.getUsers();
      })
    }

    save(user: User, confirmPassword: string): void {
        if (confirmPassword.trim() === user.password.trim()) {
            this.passwordMissMatch = "";
        } else {
            this.passwordMissMatch = "Passwords don't match";
            return;
        }
        // the _id property is added be the mongo db and should not be send when creating an object.
        delete user._id;
        this.userService.create(user).then((res) => {
          console.log("Response after post user: ",res);
          if(res.username === 'ex') {
            this.userNameExist = 'A user with this username already exist';
            return;
            //this.userExist = true;
          } else {
            this.getUsers();
            this.createUserSidenav.close();
          }

        }, (err) => {
            console.log("Could not save the user...");
        });
    }

    showDetails(user: User) {
      this.currentUser = user;
    }

    openConfirmDeleteDialog(exportClass, user:User) {
      const config = new MdDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.userService.userToDelete = user;
      this.dialogRef = this.dialog.open(ConfirmDeleteUserComponent, config);

      this.dialogRef.afterClosed().subscribe((result) => {
        if(result === 'Yes') {
          this.delete(user);
          console.log(user);
        }
      });

      this.dialogRef = null;
    }

    ngOnInit(): void {
        this.getLocations();
        //this.getAssets();
        this.getUsers();
    }


}
