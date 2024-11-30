import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsListComponent } from './doctors-list.component';

describe('DoctorsListComponent', () => {
  let component: DoctorsListComponent;
  let fixture: ComponentFixture<DoctorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
