import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationComponent, ConfirmDeleteDialog } from './organization.component';
import { OrganizationService } from './organization.service';
import { OrganizationDetailsComponent } from './details/organization-details.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    OrganizationDetailsComponent,
    OrganizationComponent,
    ConfirmDeleteDialog
  ],
  entryComponents: [
    ConfirmDeleteDialog
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OrganizationRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [
    OrganizationService
  ]
})

export class OrganizationModule {}
