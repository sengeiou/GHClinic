import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SuccessfulRegistrationPage } from './successful-registration.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulRegistrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuccessfulRegistrationPage]
})
export class SuccessfulRegistrationPageModule {}
