import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsignupComponent } from './isignup.component';

describe('IsignupComponent', () => {
  let component: IsignupComponent;
  let fixture: ComponentFixture<IsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
