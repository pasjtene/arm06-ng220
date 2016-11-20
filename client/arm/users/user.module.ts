import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { UserRoutingModule } from './user-routing.module'
import { UserComponent, ConfirmDeleteUserComponent, UserHelpComponent } from './user.comp';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
//import { UserjService } from './userj.service';
import { UserService } from './user.service';

@NgModule ({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialModule.forRoot()

  ],

  declarations: [
    UserComponent,
    ConfirmDeleteUserComponent,
    UserHelpComponent
  ],

  entryComponents: [
    ConfirmDeleteUserComponent,
    UserHelpComponent
  ],

  providers: [
    UserService, UserService
  ]
})

export class UserModule {}
