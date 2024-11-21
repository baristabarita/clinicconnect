import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHeaderComponent } from './patient-header.component';

describe('PatientHeaderComponent', () => {
  let component: PatientHeaderComponent;
  let fixture: ComponentFixture<PatientHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
