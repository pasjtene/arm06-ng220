import { Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { LocationService } from './location.service';
import { MdSidenav, MdDialog, MdDialogConfig, MdDialogRef } from "@angular/material";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from './location';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth.service';


@Component({
  moduleId: module.id,
  selector: 'location-help-dialog',
  templateUrl: 'location-help.comp.html'
})
export class LocationHelpDialog {
    constructor(
      public dialogRef: MdDialogRef<any>
    ) { }
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
  selector: 'locations',
  templateUrl: 'location.comp.html',
  styleUrls: ['location.comp.css']
})

export class LocationsComponent implements OnInit {
  isLocationCreated = false;
  mouseIn = 10000;
  mouseOnButton = 10000;
  isLocationNotCreated = false;
  createdLocationName = '';
  location1: FormGroup;
  locations: Location[];
  users: User[];
  currentLocation = {};
  @ViewChild('sidenav') sidenav: MdSidenav;
  @ViewChild('createLocationSidenav') createLocationSidenav: MdSidenav;

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
    private authService: AuthService,
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


  mover(i) {
      this.mouseIn = i;
  }

  mouseOut() {
      this.mouseIn = 10000;
  }

  setMouseOnRow(i) {
    this.mouseOnButton = i;
  }

  unSetMouseOnRow() {
    this.mouseOnButton = 100;
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

  openLocationHelpDialog(exportClass) {
   const config = new MdDialogConfig();
   config.viewContainerRef = this.vcr;
   this.dialogRef = this.dialog.open(LocationHelpDialog, config);

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

   this.locationService.create(location).then((res) => {
     //When location creation fails, the returned location values are undefined
     if(res.name !== undefined) {
       this.isLocationCreated = true;
       this.isLocationNotCreated = false;
       this.createdLocationName = location.name;
       this.getLocations();
       this.createLocationSidenav.close();
       this.resetView();
     } else {

       this.isLocationCreated = false;
       this.createdLocationName = location.name;
       this.isLocationNotCreated = true;
       //this.createLocationSidenav.open();
       this.resetView();
     }

   });

   this.router.navigate(['/locations']);
 }

 setLocation(location: Location) : void {
   console.log("Location to update: ", location);
   this.newLocation = location;
   //refresh locations view or ng Error when contact is selected. (KI)
   this.getLocations();
 }

 update(location: Location): void {

   this.locationService.update(location).then((location) => {
     //When location creation fails, the returned location values are undefined

     if(location.name !== undefined) {
       this.isLocationCreated = true;
       this.isLocationNotCreated = false;
       this.createdLocationName = location.name;
       this.getLocations();
        this.createLocationSidenav.close();
       this.resetView();
     } else {

       this.isLocationCreated = false;
       this.createdLocationName = location.name;
       this.isLocationNotCreated = true;
       this.getLocations();
       this.resetView();
     }

   });

   this.router.navigate(['/locations']);
 }

 delete(loc: Location): void {
   this.locationService
   .delete(loc._id)
   .then((res) => {
     this.locations = this.locations.filter(h => h !== loc );
  });
 }

 resetView(){ //Removes all wharnings or success flags from UI
    setTimeout(() => {
      this.isLocationCreated = false;
      this.isLocationNotCreated = false;
    }, 3000);
 }

 logout() {
     this.authService.logout();
     this.router.navigate(['/login']);
 }


}
