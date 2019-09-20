import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExaminationPaymentPage } from './physical-examination-payment.page';

describe('PhysicalExaminationPaymentPage', () => {
  let component: PhysicalExaminationPaymentPage;
  let fixture: ComponentFixture<PhysicalExaminationPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalExaminationPaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExaminationPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
