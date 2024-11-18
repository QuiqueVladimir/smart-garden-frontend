import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreationStepComponent } from './course-creation-step.component';

describe('CourseCreationStepComponent', () => {
  let component: CourseCreationStepComponent;
  let fixture: ComponentFixture<CourseCreationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCreationStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCreationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
