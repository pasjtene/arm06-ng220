import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MdSidenav } from '@angular/material';
import { Organization } from './organization';
import { UserService } from '../users/user.service';
import { User } from '../users/user';


//This function validates that the selected user from Select list is not the default value of (Select...)
//returns null if a value is selected. returns 'not_selected' otherwise.
//returning a value other than null automaticaly makes the form invalid.
function selectedNameChecker(c: AbstractControl) {
  var result = null;
  if (c.get('head').value.firstName === 'Select...') {
    result = {'not_selected':true};
  }

  //validate all contacts names in list
  for(let i=0; i < c.get('contacts').value.length; i++) {
    if(c.get('contacts').value[i].user.firstName === 'Select...') {
      result = {'not_selected':true};
    }
  }
  return result;
  //return (c.get('head').value.firstName && c.get('contacts').value[0].user.firstName) !== 'Select...' ? null : {'not_selected':true};
}



function showDate() {
  //showdateandTime is a closure as it contains a function.
  // this function is run at the interval 1000 tu return the time
  var showDateAndTime = getDate();
    window.setInterval(showDateAndTime, 1000);
}

//getDate creates a closure by returning a function
function getDate() {
  return function () {
  document.getElementById("date_and_time").innerHTML = new Date();
}
}


@Component ({
  moduleId: module.id,
  selector: 'location-component',
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.css']
})

export class OrganizationComponent implements OnInit {
  @ViewChild('createOrganization')createOrganization:MdSidenav;
  formSubmitted: boolean = false;
  users: User[] = [];
  //The user at index 0 is just a bogus user.
  //The only purpose is to have the Select... at the top of the list.
  userList: User[] = [
    {
      id: 0,
      _id: "testtt",
      username: 'teststststststsst', //no camel case for user name. as set in database.
      password: 'sshshshshshshs',
      firstName: 'Select...',
      lastName: '',
      email: '',
      organization: 'hsgsfsfsfsfs',
      location: 'hshsghsssgh'
    }
  ];

  organizationForm: FormGroup;
  public organizations: Organization[];

  public currentOrganization: Organization = {};

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService
  ) {
      this.organizationForm = this.formBuilder.group({
        name: ['', Validators.required ],
        id: ['', Validators.required ],
        head: [this.userList[0]],
        contacts: this.formBuilder.array([
          this.newContact(),
        ])
      }, {validator : selectedNameChecker} );

      this.organizations = [];
      showDate();
      this.getUsers();

  }


//The fist contact in dropdown list is initialized to the fake user with name "Select a new user"
  newContact() {
    return this.formBuilder.group({
      user: [this.userList[0],
      //add more validator if needed
       Validators.compose([Validators.required])
     ],
      contactEmail: ['']
    });
  }

  addContact() {
    const control = <FormArray>this.organizationForm.controls['contacts'];
    console.log("New contact: ", control.controls[0]);
    control.push(this.newContact());
  }

  removeContact(i: number) {
    const control = <FormArray>this.organizationForm.controls['contacts'];
    control.removeAt(i);
  }

  getUsers() : Promise<User[]> {
    return this.userService.getUsers().then(users => {
      this.users = users;
      return users;
    });
  }

  ngOnInit() {
    //control.controls[0].value.contactName.firstName = "Select"
    this.getUsers().then(users => {
      this.users = users;
      //we transfer all users into contactList for manipulation.
      //contacList contains the dropdown list for contact selection.
      //contactlist[0] is initialized with the default value: A fake user with name = "Select a new user"
      for(var i=1; i <= users.length; i++) {
        this.userList[i] = users[i-1];
      }
    });
  }


  onChangeUser(user, Obj) {
    //console.log("The user is: ", user);
  }

  save(organization, isValid) {
    if(isValid) {
      this.organizations.push(organization);
      this.createOrganization.close();
    }

    console.log("Organization...",this.organizations);
    this.formSubmitted = true;
    console.log("Form valid?: ",isValid);
  }


  showDetails(organization) {
    this.currentOrganization = organization;
  }

}
