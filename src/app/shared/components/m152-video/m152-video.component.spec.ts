import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M152VideoComponent } from './m152-video.component';

describe('M152VideoComponent', () => {
  let component: M152VideoComponent;
  let fixture: ComponentFixture<M152VideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M152VideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(M152VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
