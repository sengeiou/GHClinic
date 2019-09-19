import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomerPage } from './my-customer.page';

describe('MyCustomerPage', () => {
  let component: MyCustomerPage;
  let fixture: ComponentFixture<MyCustomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCustomerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
