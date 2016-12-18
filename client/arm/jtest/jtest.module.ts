import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JtestComponent } from './jtest.component';
import { JtestDetailsComponent } from './details/jtest-details.component';
import { JtestRoutingModule } from './jtest-routing.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    JtestDetailsComponent,
    JtestComponent

  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    JtestRoutingModule,
    MaterialModule.forRoot()
  ]
})

export class JtestModule {}
