import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentModalComponent } from './view-appointment-modal.component';

describe('ViewAppointmentModalComponent', () => {
  let component: ViewAppointmentModalComponent;
  let fixture: ComponentFixture<ViewAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAppointmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
