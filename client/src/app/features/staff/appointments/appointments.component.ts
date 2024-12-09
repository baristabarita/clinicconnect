import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAppointmentsComponent } from './appointments.component';

describe('AppointmentsComponent', () => {
  let component: RecentAppointmentsComponent;
  let fixture: ComponentFixture<RecentAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
