import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    //used when lazy loading a child component
    RouterModule.forChild([
           { path: '', component: HomeComponent }
       ])
  ],
  declarations: [HomeComponent]
})

export class HomeModule { }
