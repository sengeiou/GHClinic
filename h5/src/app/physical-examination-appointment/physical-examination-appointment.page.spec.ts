import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExaminationAppointmentPage } from './physical-examination-appointment.page';

describe('PhysicalExaminationAppointmentPage', () => {
  let component: PhysicalExaminationAppointmentPage;
  let fixture: ComponentFixture<PhysicalExaminationAppointmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalExaminationAppointmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExaminationAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
