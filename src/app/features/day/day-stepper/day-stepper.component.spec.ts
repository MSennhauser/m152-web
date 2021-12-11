import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayStepperComponent } from './day-stepper.component';

describe('DayStepperComponent', () => {
  let component: DayStepperComponent;
  let fixture: ComponentFixture<DayStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
