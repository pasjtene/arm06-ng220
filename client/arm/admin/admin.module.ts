import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home.component';
import { ManageCrisesComponent } from './manage-crises.component';
import { ManageUsersComponent } from './manage-users.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AuthGuard } from '../auth-guard.service';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    ManageCrisesComponent,
    ManageUsersComponent
  ]
  //providers: [AuthGuard, AuthService]

})

export class AdminModule {}
