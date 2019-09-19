import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDrugsPage } from './search-drugs.page';

describe('SearchDrugsPage', () => {
  let component: SearchDrugsPage;
  let fixture: ComponentFixture<SearchDrugsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDrugsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDrugsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
