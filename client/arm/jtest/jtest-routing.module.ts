/*
*Author: Pascal Tene
*Created: dec 2016
*
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JtestComponent } from './jtest.component';
import { AuthGuard } from '../auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'jtest',
        component: JtestComponent,
        canActivate: [AuthGuard]
      }
    ])
    ],

  exports: [
    RouterModule
  ]
})

export class JtestRoutingModule {}
