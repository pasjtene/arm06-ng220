/*
*Author: Pascal Tene
*Created: dec 2016
*
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { AuthGuard } from '../auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'organizations',
        component: OrganizationComponent,
        canActivate: [AuthGuard]
      }
    ])
    ],

  exports: [
    RouterModule
  ]
})

export class OrganizationRoutingModule {}
