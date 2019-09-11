import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulReservationPage } from './successful-reservation.page';

describe('SuccessfulReservationPage', () => {
  let component: SuccessfulReservationPage;
  let fixture: ComponentFixture<SuccessfulReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulReservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
