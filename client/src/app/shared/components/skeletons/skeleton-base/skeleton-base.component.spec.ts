import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBaseComponent } from './skeleton-base.component';

describe('SkeletonBaseComponent', () => {
  let component: SkeletonBaseComponent;
  let fixture: ComponentFixture<SkeletonBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
