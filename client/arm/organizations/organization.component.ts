import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Organization } from './organization';
import { UserService } from '../users/user.service';
import { User } from '../users/user';



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

export class OrganizationComponent implements OnInit, AfterContentInit {
  public formSubmitted: boolean = false;
  users: User[] = [];
  contactList: User[] = [
    {
      id: 0,
      _id: "testtt",
      username: 'teststststststsst', //no camel case for user name. as set in database.
      password: 'sshshshshshshs',
      firstName: 'Select a new contact',
      lastName: '',
      email: '',
      organization: 'hsgsfsfsfsfs',
      location: 'hshsghsssgh'
    }
  ];

  active_text = "Click me";
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
        head: '',
        contacts: this.formBuilder.array([
          this.newContact(),
        ])
      });

      this.organizations = [];


      showDate();
      this.getUsers();

  }


//The fist contact in dropdown list is initialized to the fake user with name "Select a new user"
  newContact() {
    return this.formBuilder.group({
      user: [this.contactList[0], Validators.required],
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
        this.contactList[i] = users[i-1];
      }
    });
  }


  onChangeUser(user, Obj) {
    //console.log("The user is: ", user);
  }

  save(organization) {
    this.organizations.push(organization);
    console.log("Organization...",this.organizations);
    this.formSubmitted = true;
  }


  showDetails(organization) {
    this.currentOrganization = organization;
  }

}
