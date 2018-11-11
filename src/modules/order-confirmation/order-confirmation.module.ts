import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';

// Components
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
           { path: '', component: OrderConfirmationComponent }
       ])
  ],
  declarations: [OrderConfirmationComponent]
})

export class OrderConfirmationModule { }
