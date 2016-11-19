import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { userRegisterComponent } from './user-register.comp';
import { AuthGuard } from '../auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users/register',
        component: userRegisterComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users/:id',
        canActivate: [AuthGuard],
        component: UserDetailComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {}
