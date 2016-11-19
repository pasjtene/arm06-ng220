/*
*Author: Pascal Tene
*Created: Sept 2016
*
*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetComponent } from './asset.comp';
import { AuthGuard } from '../auth-guard.service';

@NgModule ({
  imports: [
    RouterModule.forChild ([
        {
          path: 'assets',
          component: AssetComponent,
          canActivate: [AuthGuard]
        }
    ])
  ],
  exports: [
    RouterModule
  ]

})

export class AssetRoutingModule {}
