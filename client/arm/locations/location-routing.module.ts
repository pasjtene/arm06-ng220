import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateLocationComponent } from './create-location.comp';
import { LocationsComponent } from './location.comp';

@NgModule ({
  imports: [
    RouterModule.forChild ([

    {
      path: 'locations',
      component: LocationsComponent
    }
  ])
  ],
  exports: [
    RouterModule
  ]
})

export class LocationRoutingModule {

}
