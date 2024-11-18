import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePublishedDialogComponent } from './course-published-dialog.component';

describe('CoursePublishedDialogComponent', () => {
  let component: CoursePublishedDialogComponent;
  let fixture: ComponentFixture<CoursePublishedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePublishedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePublishedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
