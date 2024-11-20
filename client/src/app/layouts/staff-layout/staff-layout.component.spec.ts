import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLayoutComponent } from './staff-layout.component';

describe('DoctorLayoutComponent', () => {
  let component: DoctorLayoutComponent;
  let fixture: ComponentFixture<DoctorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
