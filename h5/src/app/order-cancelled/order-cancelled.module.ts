import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderCancelledPage } from './order-cancelled.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCancelledPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderCancelledPage]
})
export class OrderCancelledPageModule {}
