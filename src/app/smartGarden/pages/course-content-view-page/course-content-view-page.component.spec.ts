import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentViewPageComponent } from './course-content-view-page.component';

describe('CourseContentViewPageComponent', () => {
  let component: CourseContentViewPageComponent;
  let fixture: ComponentFixture<CourseContentViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseContentViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseContentViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
