import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffAppointmentModalComponent } from './view-staff-appointment-modal.component';

describe('ViewStaffAppointmentModalComponent', () => {
  let component: ViewStaffAppointmentModalComponent;
  let fixture: ComponentFixture<ViewStaffAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStaffAppointmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStaffAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
