import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrder0Page } from './my-order0.page';

describe('MyOrder0Page', () => {
  let component: MyOrder0Page;
  let fixture: ComponentFixture<MyOrder0Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrder0Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrder0Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
