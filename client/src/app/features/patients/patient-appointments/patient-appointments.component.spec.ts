import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsAppointmentsComponent } from './patient-appointments.component';

describe('PatientsAppointmentsComponent', () => {
  let component: PatientsAppointmentsComponent;
  let fixture: ComponentFixture<PatientsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
