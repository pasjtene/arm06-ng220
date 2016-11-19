import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/assets',
    pathMatch: 'full'
  },
  {
    path: 'admin2',
    loadChildren: 'arm/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  //{
    //path: 'login',
    //component: LoginComponent
//  },
  {
    path: 'home',
    component: HomeComponent
  },
  //{
  //  path: '**',
    //component: PageNotFoundComponent
  //}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})

export class ArmRoutingModule {}
