import { Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { LocationService } from '../location.service';
import { MdSidenav, MdDialog, MdDialogConfig, MdDialogRef } from "@angular/material";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '../location';
import { User } from '../../users/user';
import { UserService } from '../../users/user.service';


@Component({
  selector: 'settings-dialog',
  template: `
  <h2>Hi! I am the first dialog!</h2>
<p>I'm working on a POC app, and I'm trying get the MdDialog component working. Does any one have a working example of what to pass to the MdDialog open method?</p>
<button md-raised-button (click)="dialogRef.close()">Close dialog</button>
  `
})
export class SettingsDialog {
    constructor(public dialogRef: MdDialogRef<any>) { }
}



@Component({
  selector: 'confirm-delete-dialog',
  template: `
  <h2>Are you sure you want to delete this location? {{ dlocation.name}}</h2>
<p>Click yes to permanently delete the location </p>
<button class="btn btn-success" (click)="dialogRef.close() " >Cancel</button> <button class="btn btn-danger" (click)="dialogRef.close('Yes')">Yes delete</button>
  `
})

export class ConfirmDeleteDialog implements OnInit {
  dlocation: Location = {
      _id: '', // Not needed but . not adding this triggers a type Script error.
      name: '',
      city: '',
      state: '',
      country: '',
      contacts: []
  }

    constructor (
      public dialogRef: MdDialogRef<any>,
      private locationService: LocationService,

    ) { }

    ngOnInit(): void {
      console.log("Started ");
      //the location to delete is set in openConfirmDeleteDialog via locationService
      this.dlocation = this.locationService.locationToDelete;
    }
}


@Component({
  selector: 'confirm-logout',
  template: `
  <label>You will be logget out of the application ok ?<label>
  <md-slide-toggle>Yes </md-slide-toggle>
  `
})

export class ConfirmLogout {

}

@Component({
  moduleId: module.id,
  selector: 'list-locations',
  templateUrl: 'list-locations.comp.html',
  styleUrls: ['list-locations.comp.css']
})

export class ListLocationsComponent implements OnInit {
  isLocationCreated = false;
  isLocationNotCreated = false;
  createdLocationName = '';
  location1: FormGroup;
  locations: Location[];
  users: User[];
  currentLocation = {};
  @ViewChild('sidenav') sidenav: MdSidenav;

  dialogRef: MdDialogRef<any>;

  newLocation: Location = {
      _id: '', // Not needed but . not adding this triggers a type Script error.
      name: '',
      city: '',
      state: '',
      country: '',
      contacts: []
  }


  constructor(
    private locationService: LocationService,
    private userService: UserService,
    public confirmLogoutDialog: MdDialog,
    public vcr: ViewContainerRef,
    public dialog: MdDialog,

    public formBuilder: FormBuilder,
    //public locationService : LocationService,
    private router: Router
  ) {

    this.location1 = this.formBuilder.group({
      name:['', Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])],
      city:['', Validators.compose([Validators.minLength(3), Validators.maxLength(40)])],
      state:['', Validators.compose([Validators.maxLength(30), Validators.minLength(2)])],
      country:['', Validators.compose([Validators.minLength(2), Validators.maxLength(30)])]
    });
  }

  getLocations() :void {
    this.locationService.getLocations().then((locations) => {
      this.locations = locations;
    })
  }

  getUsers() : void {
    this.userService.getUsers().then((users) => {
      this.users = users;
    })
  }

  ngOnInit(): void {
    this.getLocations();
    this.getUsers();
  }

  confirmLogout() {
    const config = new MdDialogConfig();
    config.viewContainerRef = this.vcr;
    this.dialogRef = this.confirmLogoutDialog.open(ConfirmLogout, config);

  }

  showDetails(location) {
    this.currentLocation = location;
    this.sidenav.open();
  }

  openDialog(d) {
   const config = new MdDialogConfig();
   config.viewContainerRef = this.vcr;
   this.dialogRef = this.dialog.open(SettingsDialog, config);

   this.dialogRef.afterClosed().subscribe(result => {
     this.dialogRef = null;
   });
 }

 openConfirmDeleteDialog(d, location:Location) {
  const config = new MdDialogConfig();
  config.viewContainerRef = this.vcr;

  //set the location to delete so we can show it it the dialog
  this.locationService.locationToDelete = location;

  this.dialogRef = this.dialog.open(ConfirmDeleteDialog, config);

  this.dialogRef.afterClosed().subscribe(result => {
    if(result === "Yes") {
      this.delete(location);

    }
    this.dialogRef = null;
  });
}

 createLocation(location: Location): void {
   delete location._id; // the _id will be automatically created by mongoDb. Providing an empty _id will cause a database failure
   console.log(this.location1.value);
   console.log(JSON.stringify(this.location1.value));
   this.locationService.create(location).then((res) => {
     //When location creation fails, the returned location values are undefined
     if(res.name !== undefined) {
       this.isLocationCreated = true;
       this.isLocationNotCreated = false;
       this.createdLocationName = location.name;
       //this.locations.push(location);
       //populate the displayed array with locations fron database.
       //This gives the ability to delete what we see on screen soon after creating.
       this.getLocations();
       this.resetView();
     } else {
       console.log("Not saved the name is undefined")
       this.isLocationCreated = false;
       this.createdLocationName = location.name;
       this.isLocationNotCreated = true;
       this.resetView();
     }

   });
   console.log("The new location is: ", location);

   this.router.navigate(['/locations']);
 }

 delete(loc: Location): void {
   console.log("deleting location....: "+JSON.stringify(loc));
   this.locationService
   .delete(loc._id)
   .then((res) => {
     this.locations = this.locations.filter(h => h !== loc );
     console.log("Response after delete: ",res);
     //if (this.selectedUser === user ) {
       //this.selectedUser = null;
    // }
  });
 }

 resetView(){ //Removes all wharnings or success flags from UI
    setTimeout(() => {
      this.isLocationCreated = false;
      this.isLocationNotCreated = false;
    }, 3000);

 }


}
