import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCoursePageComponent } from './preview-course-page.component';

describe('PreviewCoursePageComponent', () => {
  let component: PreviewCoursePageComponent;
  let fixture: ComponentFixture<PreviewCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCoursePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
