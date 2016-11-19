import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { UserRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { userRegisterComponent } from './user-register.comp';

import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    userRegisterComponent
  ],
  providers: [
    UserService
  ]
})

export class UsersModule {}
