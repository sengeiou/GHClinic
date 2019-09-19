import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPhysicalExaminationPage } from './my-physical-examination.page';

describe('MyPhysicalExaminationPage', () => {
  let component: MyPhysicalExaminationPage;
  let fixture: ComponentFixture<MyPhysicalExaminationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPhysicalExaminationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPhysicalExaminationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
