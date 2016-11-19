import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router'
import { MdSidenav, MdDialog, MdDialogConfig, MdDialogRef } from "@angular/material";
import { User } from './user';
import { UserService } from './user.service';



@Component({
  selector: 'confirm-delete-user-dialog',
  template: `
  <h3> Delete this user ?: 2 {{n}} {{ userToDelete | json }}</h3>
  <p>Click yes to permanently delete this user </p>
  <button class="btn btn-success" (click)="dialogRef.close() " >Cancel</button> <button class="btn btn-danger" (click)="dialogRef.close('Yes')">Yes delete</button>
  `
})

export class ConfirmDeleteUserComponent implements OnInit {
  userToDelete : User;
  n= "";

  constructor(
    private userService: UserService,
    public dialogRef: MdDialogRef<any>
  ){}

  ngOnInit() : void {
    this.userToDelete = this.userService.getUserToDelete();

    this.n = this.userService.nnn;
    console.log("Init2 confirm delete: ", this.userService.userToDelete);
  }
}

@Component({
  moduleId: module.id,
  selector: 'arm-users',
  templateUrl: 'user.comp.html',
  styleUrls: ['user.comp.css'],
  providers: [UserService]
})

export class UserComponent implements OnInit {
  usersTitle = " Click a user to view and update details";
  users : User[];
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
  selectedUser: User;
  confirmPassword = '';
  passwordMissMatch = '';
  mouseIn = 100;
  mouseOnButton = 100;
  dialogRef: MdDialogRef<any>;
  private selectedId: number;

  constructor(
    private router: Router,
    private userService: UserService,
    public viewContainerRef: ViewContainerRef,
    public dialog: MdDialog
  ) {}

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
    .delete(user._id)
    .then(() => {
      this.users = this.users.filter(h => h !== user );
      if (this.selectedUser === user ) {
        this.selectedUser = null;
      }
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
          console.log("User created successfully...");
      }, (err) => {
          console.log("Could not save the user...");
      });
  }

  openConfirmDeleteDialog(exportClass, user:User) {
    const config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.userService.setUserToDelete(user);
    //this.userService.userToDelete = user;
    this.dialogRef = this.dialog.open(ConfirmDeleteUserComponent, config);

    this.dialogRef.afterClosed().subscribe((result) => {
      if(result === 'Yes') {
        this.delete(user);
      }
    });

    this.dialogRef = null;
    this.userService.getUserToDelete();
  }

}
