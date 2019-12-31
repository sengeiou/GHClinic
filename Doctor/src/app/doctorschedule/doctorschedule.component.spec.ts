import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorscheduleComponent } from './doctorschedule.component';

describe('DoctorscheduleComponent', () => {
  let component: DoctorscheduleComponent;
  let fixture: ComponentFixture<DoctorscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
