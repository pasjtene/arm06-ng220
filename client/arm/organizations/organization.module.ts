import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationComponent } from './organization.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OrganizationRoutingModule,
    MaterialModule.forRoot()
  ]
})

export class OrganizationModule {}