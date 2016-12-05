import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization } from './organization';


@Component ({
  moduleId: module.id,
  selector: 'location-component',
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.css']
})

export class OrganizationComponent {
  organizationForm: FormGroup;
  organizations: Organization[];

  constructor(
    public formBuilder: FormBuilder
  ) {
      this.organizationForm = this.formBuilder.group({
        name: ['', Validators.required ],
        id: ['', Validators.required ],
        head: ''
      });

      this.organizations = [];
  }

  save(organization) {
    console.log(this.organizations);
    this.organizations.push(organization);
    //console.log(organization.uniqueId);
    //console.log(form.controls);
  }
}
