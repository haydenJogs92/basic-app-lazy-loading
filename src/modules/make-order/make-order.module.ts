import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';

// Components
import { MakeOrderComponent } from './make-order/make-order.component';

//modules
import { SharedModule } from '../shared/shared.module';
import { AllFormsModule } from '../all-forms/all-forms.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AllFormsModule,
    RouterModule.forChild([
           { path: '', component: MakeOrderComponent }
       ])
  ],
  declarations: [MakeOrderComponent]
})

export class MakeOrderModule { }
