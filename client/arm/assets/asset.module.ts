import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AssetRoutingModule } from './asset-routing.module'
import { AssetComponent, ConfirmDeleteAssetComponent, AssetHelpComponent } from './asset.comp';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AssetService } from './asset.service';

@NgModule ({
  imports: [
    CommonModule,
    AssetRoutingModule,
    FormsModule,
    MaterialModule.forRoot()

  ],
  
  declarations: [
    AssetComponent,
    ConfirmDeleteAssetComponent,
    AssetHelpComponent
  ],

  entryComponents: [
    ConfirmDeleteAssetComponent,
    AssetHelpComponent
  ],

  providers: [
    AssetService
  ]
})

export class AssetModule {}
