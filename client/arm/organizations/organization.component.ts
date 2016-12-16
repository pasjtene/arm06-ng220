import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Organization } from './organization';
import { UserService } from '../users/user.service';



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
  users = {};
  active_text = "Click me";
  organizationForm: FormGroup;
  organizations: Organization[];
  currentOrganization: Organization = {};

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
  }

  newContact() {
    return this.formBuilder.group({
      contactName: ['', Validators.required],
      contactEmail: ['']
    });
  }

  addContact() {
    const control = <FormArray>this.organizationForm.controls['contacts'];
    control.push(this.newContact());
  }

  removeContact(i: number) {
    const control = <FormArray>this.organizationForm.controls['contacts'];
    control.removeAt(i);
  }

  getUsers() : void {
    this.userService.getUsers().then(users => {
      this.users = users;
      console.log(users);
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  save(organization) {
    this.organizations.push(organization);
  }



  showDetails(organization) {
    this.currentOrganization = organization;
  }

  moDown() {
    this.active_text = "Thank You";
    //obj.style.backgroundColor = "#1ec5e5";
    //obj.innerHTML = "Release Me";
}

mUp(obj) {
  this.active_text = "Click me";
}
}
