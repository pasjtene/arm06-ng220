/*
*Author: Pascal Tene
*Created: Sept 2016
*
*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetComponent } from './asset.comp';

@NgModule ({
  imports: [
    RouterModule.forChild ([
        {
          path: 'assets',
          component: AssetComponent
        }
    ])
  ],
  exports: [
    RouterModule
  ]

})

export class AssetRoutingModule {}
