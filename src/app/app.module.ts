import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//routes
import { routes } from './app.routes'
//Custom Module With Singleton Services
import { CoreModule } from '../modules/core/core.module';
//Custom Module with shared components
import { SharedModule } from '../modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    //custom modules
    CoreModule.forRoot(),
    SharedModule,
    //for routes
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
