import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { UserjRoutingModule } from './userj-routing.module'
import { UserComponent, ConfirmDeleteUserComponent } from './user.comp';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
//import { UserjService } from './userj.service';
import { UserService } from './user.service';

@NgModule ({
  imports: [
    CommonModule,
    UserjRoutingModule,
    FormsModule,
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
    UserService, UserService
  ]
})

export class UserjModule {}
