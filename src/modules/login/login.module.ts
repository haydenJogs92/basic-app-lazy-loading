import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';
import { AllFormsModule } from '../all-forms/all-forms.module';

@NgModule({
  imports: [
    CommonModule,
    AllFormsModule,
    SharedModule,

    //used when lazy loading a child component
    RouterModule.forChild([
        { path: '', component: LoginComponent }
       ])
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
