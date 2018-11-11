import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';

// Components
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
           { path: '', component: OrderHistoryComponent }
       ])
  ],
  declarations: [OrderHistoryComponent]
})

export class OrderHistoryModule { }
