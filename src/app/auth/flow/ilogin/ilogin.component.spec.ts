import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IloginComponent } from './ilogin.component';

describe('IloginComponent', () => {
  let component: IloginComponent;
  let fixture: ComponentFixture<IloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
