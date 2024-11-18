import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStepComponent } from './check-step.component';

describe('CheckStepComponent', () => {
  let component: CheckStepComponent;
  let fixture: ComponentFixture<CheckStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
