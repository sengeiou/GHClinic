import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppointment0Page } from './my-appointment0.page';

describe('MyAppointment0Page', () => {
  let component: MyAppointment0Page;
  let fixture: ComponentFixture<MyAppointment0Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppointment0Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointment0Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
