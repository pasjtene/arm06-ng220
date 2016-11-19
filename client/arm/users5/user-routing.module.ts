import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { UserListComponent } from './user-list.component';
import { UserComponent } from './user.comp';
//import { userRegisterComponent } from './user-register.comp';
import { AuthGuard } from '../auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users/register',
        component: UserComponent,
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users/:id',
        canActivate: [AuthGuard],
        component: UserComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {}
