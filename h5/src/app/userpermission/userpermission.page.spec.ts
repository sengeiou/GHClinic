import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpermissionPage } from './userpermission.page';

describe('UserpermissionPage', () => {
  let component: UserpermissionPage;
  let fixture: ComponentFixture<UserpermissionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpermissionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpermissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
