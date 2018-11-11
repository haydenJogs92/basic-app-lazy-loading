import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';

// Components
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { SharedModule } from '../shared/shared.module';
import { AllFormsModule } from '../all-forms/all-forms.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AllFormsModule,
    RouterModule.forChild([
           { path: '', component: UpdateDetailsComponent }
       ])
  ],
  declarations: [UpdateDetailsComponent]
})

export class UpdateDetailsModule { }
