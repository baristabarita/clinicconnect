import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCardComponent } from './doctor-card.component';

describe('DoctorCardComponent', () => {
  let component: DoctorCardComponent;
  let fixture: ComponentFixture<DoctorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
