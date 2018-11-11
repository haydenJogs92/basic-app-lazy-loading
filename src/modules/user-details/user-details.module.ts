import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';

// Components
import { UserDetailsComponent } from './user-details/user-details.component';

//modules
import { SharedModule } from '../shared/shared.module';
import { AllFormsModule } from '../all-forms/all-forms.module';

@NgModule({
  imports: [
    CommonModule,
    AllFormsModule,
    SharedModule,    
    RouterModule.forChild([
           { path: '', component: UserDetailsComponent }
       ])
  ],
  declarations: [UserDetailsComponent]
})

export class UserDetailsModule { }
