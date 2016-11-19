import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
//import { MaterialModule } from '@angular/material';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
//import { InMemoryDataService }  from './in-memory-data.service';

import { ArmComponent } from './arm.component';
//import { UserService } from './users/user.service';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { ArmRoutingModule } from './arm-routing.module';
import { PageNotFoundComponent } from './page-not-found.component'
//import { UserModule } from './users/user.module';
import { UserModule } from './users/user.module';
//import { CrisisModule } from './crisis-center/crisis.module';
import { AdminModule } from './admin/admin.module';

import { LoginRoutingModule } from './login-routing.module';
import { LocationModule } from './locations/location.module';
import { AssetModule } from './assets/asset.module';

import { MaterialModule } from '@angular/material';
import { DialogService } from './dialog.service';
import { LocationChartDirective } from './d3ng/location-chart.component';
import { ArmStatsBarChartComponent } from './d3ng/bar-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //UserModule,
    LocationModule,
    AssetModule,
    AdminModule,
    LoginRoutingModule,
    ArmRoutingModule,
    UserModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    ArmComponent,
    LoginComponent,
    HomeComponent,
    LocationChartDirective,
    ArmStatsBarChartComponent,
    PageNotFoundComponent
      ],
  providers: [
    DialogService
  ],
  bootstrap: [ ArmComponent ]
})



export class ArmModule {}
