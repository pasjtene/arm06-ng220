import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'

import { UserRoutingModule } from './user-routing.module';
import { UserComponent, ConfirmDeleteUserComponent } from './user.comp';
//import { UserDetailComponent } from './user-detail.component';
//import { userRegisterComponent } from './user-register.comp';

import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    UserComponent,
    ConfirmDeleteUserComponent
  ],
  entryComponents: [
    ConfirmDeleteUserComponent
  ],
  providers: [
    UserService
  ]
})

export class UserModule {}
