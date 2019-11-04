import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WenZhanTuiSonPage } from './wen-zhan-tui-son.page';

describe('WenZhanTuiSonPage', () => {
  let component: WenZhanTuiSonPage;
  let fixture: ComponentFixture<WenZhanTuiSonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WenZhanTuiSonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WenZhanTuiSonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
