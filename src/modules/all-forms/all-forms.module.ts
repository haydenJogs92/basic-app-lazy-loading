import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Form Components
import { LoginFormComponent } from './login-form/login-form.component';
import { FloatingLabelInputComponent } from './floating-label-input/floating-label-input.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { UpdateDetailsFormComponent } from './update-details-form/update-details-form.component'


//requires component in shared module
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    FloatingLabelInputComponent,
    LoginFormComponent,
    OrderFormComponent,
    UpdateDetailsFormComponent,
  ],
  exports: [
    FloatingLabelInputComponent,
    LoginFormComponent,
    OrderFormComponent,
    UpdateDetailsFormComponent,
  ]
})
export class AllFormsModule { }
