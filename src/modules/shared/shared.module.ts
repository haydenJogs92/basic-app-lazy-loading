import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Shared components
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ErrorMessageComponent } from './error-message/error-message.component'
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { NotFoundComponent } from './not-found/not-found.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    OrderDetailsComponent,
    ErrorMessageComponent,
    FooterComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  exports: [
    OrderDetailsComponent,
    ErrorMessageComponent,
    FooterComponent,
    NavBarComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
