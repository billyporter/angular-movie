import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DisplayComponent } from './components/display/display.component';
import { MylistComponent } from './components/mylist/mylist.component';

@NgModule({
  declarations: [LandingComponent, FormComponent, DisplayComponent, MylistComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [LandingComponent],
})
export class EntireAppModule {}
