import { Component } from '@angular/core';
import { AuthGuard } from '../auth-guard.service';

@Component({
  template: `
  <h3> ADMIN </h3>
  <nav>
  <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Admin Home</a>
  <a routerLink="./crises" routerLinkActive="active"> Manage Crises</a>
  <a routerLink="./users" routerLinkActive="active"> Manage Users</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  providers: [AuthGuard]
})

export class AdminComponent {

}
