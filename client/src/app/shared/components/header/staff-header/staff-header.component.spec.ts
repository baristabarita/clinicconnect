import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHeaderComponent } from './staff-header.component';

describe('StaffHeaderComponent', () => {
  let component: StaffHeaderComponent;
  let fixture: ComponentFixture<StaffHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
