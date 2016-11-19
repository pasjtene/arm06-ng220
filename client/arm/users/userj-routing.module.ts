/*
*Author: Pascal Tene
*Created: Sept 2016
*
*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.comp';

@NgModule ({
  imports: [
    RouterModule.forChild ([
        {
          path: 'users',
          component: UserComponent
        }
    ])
  ],
  exports: [
    RouterModule
  ]

})

export class UserjRoutingModule {}
