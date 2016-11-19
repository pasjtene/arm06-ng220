import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from './location.service';

@Component({
  moduleId: module.id,
  selector: 'create-location',
  templateUrl: 'create-location.comp.html',
  styleUrls: ['create-location.comp.css']
})

export class CreateLocationComponent {
  location: FormGroup;

    constructor(
      public formBuilder: FormBuilder,
      public locationService : LocationService,
      private router: Router
    )
    {
      this.location = this.formBuilder.group({
        name:['', Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])],
        city:['', Validators.compose([Validators.minLength(3), Validators.maxLength(40)])],
        state:['', Validators.compose([Validators.maxLength(30), Validators.minLength(2)])],
        country:['', Validators.compose([Validators.minLength(2), Validators.maxLength(30)])]
      });
    }

    createLocation(): void {
      console.log(this.location.value);
      console.log(JSON.stringify(this.location.value));
      this.locationService.create(this.location.value);
      this.router.navigate(['/locations']);
    }
}
