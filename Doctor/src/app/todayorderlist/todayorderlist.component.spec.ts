import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayorderlistComponent } from './todayorderlist.component';

describe('TodayorderlistComponent', () => {
  let component: TodayorderlistComponent;
  let fixture: ComponentFixture<TodayorderlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayorderlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayorderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
