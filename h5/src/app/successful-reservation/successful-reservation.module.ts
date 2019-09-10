import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SuccessfulReservationPage } from './successful-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulReservationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuccessfulReservationPage]
})
export class SuccessfulReservationPageModule {}
