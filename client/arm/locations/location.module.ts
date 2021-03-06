import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { LocationRoutingModule } from './location-routing.module';


import { LocationService } from './location.service';
import { CreateLocationComponent } from './create-location.comp';
//import { ListLocationsComponent, ConfirmLogout, SettingsDialog, ConfirmDeleteDialog } from './list/list-locations.comp';
import { LocationsComponent, ConfirmLogout, LocationHelpDialog, ConfirmDeleteDialog } from './location.comp';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocationRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    LocationsComponent,
    ConfirmLogout,    
    ConfirmDeleteDialog,
    LocationHelpDialog
  ],
    entryComponents: [
      LocationsComponent,
      ConfirmLogout,
      ConfirmDeleteDialog,
      LocationHelpDialog

    ],
    providers: [
    LocationService
  ]
})

export class LocationModule {}
