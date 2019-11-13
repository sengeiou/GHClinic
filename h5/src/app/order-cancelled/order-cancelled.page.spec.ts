import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelledPage } from './order-cancelled.page';

describe('OrderCancelledPage', () => {
  let component: OrderCancelledPage;
  let fixture: ComponentFixture<OrderCancelledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelledPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancelledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
