import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDutyPage } from './no-duty.page';

describe('NoDutyPage', () => {
  let component: NoDutyPage;
  let fixture: ComponentFixture<NoDutyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDutyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDutyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
