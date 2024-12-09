import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAppointmentsComponent } from './recent-appointments.component';

describe('RecentAppointmentsComponent', () => {
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
