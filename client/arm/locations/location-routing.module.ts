import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateLocationComponent } from './create-location.comp';
import { LocationsComponent } from './location.comp';
import { AuthGuard } from '../auth-guard.service';

@NgModule ({
  imports: [
    RouterModule.forChild ([

    {
      path: 'locations',
      component: LocationsComponent,
      canActivate: [AuthGuard]
    }
  ])
  ],
  exports: [
    RouterModule
  ]
})

export class LocationRoutingModule {

}
