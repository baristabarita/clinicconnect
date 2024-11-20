import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoggedComponent } from './header-logged.component';

describe('HeaderLoggedComponent', () => {
  let component: HeaderLoggedComponent;
  let fixture: ComponentFixture<HeaderLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLoggedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
