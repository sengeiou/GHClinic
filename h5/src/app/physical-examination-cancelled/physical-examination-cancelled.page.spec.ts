import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExaminationCancelledPage } from './physical-examination-cancelled.page';

describe('PhysicalExaminationCancelledPage', () => {
  let component: PhysicalExaminationCancelledPage;
  let fixture: ComponentFixture<PhysicalExaminationCancelledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalExaminationCancelledPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExaminationCancelledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
