import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExaminationCompletePage } from './physical-examination-complete.page';

describe('PhysicalExaminationCompletePage', () => {
  let component: PhysicalExaminationCompletePage;
  let fixture: ComponentFixture<PhysicalExaminationCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalExaminationCompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExaminationCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
