import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateLocationComponent } from './create-location.comp';
import { ListLocationsComponent } from './list/list-locations.comp';

@NgModule ({
  imports: [
    RouterModule.forChild ([

    {
      path: 'locations',
      component: ListLocationsComponent
    }
  ])
  ],
  exports: [
    RouterModule
  ]
})

export class LocationRoutingModule {

}
