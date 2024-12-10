import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsSkeletonComponent } from './appointments-skeleton.component';

describe('AppointmentsSkeletonComponent', () => {
  let component: AppointmentsSkeletonComponent;
  let fixture: ComponentFixture<AppointmentsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
