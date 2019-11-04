import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInformationPage } from './activity-information.page';

describe('ActivityInformationPage', () => {
  let component: ActivityInformationPage;
  let fixture: ComponentFixture<ActivityInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
