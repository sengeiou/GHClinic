import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },  { path: 'information', loadChildren: './information/information.module#InformationPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'clinic', loadChildren: './clinic/clinic.module#ClinicPageModule' },
  { path: 'doctor', loadChildren: './doctor/doctor.module#DoctorPageModule' },
  { path: 'appointment', loadChildren: './appointment/appointment.module#AppointmentPageModule' },
  { path: 'successful-reservation', loadChildren: './successful-reservation/successful-reservation.module#SuccessfulReservationPageModule' },
  { path: 'physical-examination', loadChildren: './physical-examination/physical-examination.module#PhysicalExaminationPageModule' },
  { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
