import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPhysicalExamination0Page } from './my-physical-examination0.page';

describe('MyPhysicalExamination0Page', () => {
  let component: MyPhysicalExamination0Page;
  let fixture: ComponentFixture<MyPhysicalExamination0Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPhysicalExamination0Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPhysicalExamination0Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
