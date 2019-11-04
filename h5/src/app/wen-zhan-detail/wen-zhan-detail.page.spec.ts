import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WenZhanDetailPage } from './wen-zhan-detail.page';

describe('WenZhanDetailPage', () => {
  let component: WenZhanDetailPage;
  let fixture: ComponentFixture<WenZhanDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WenZhanDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WenZhanDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
