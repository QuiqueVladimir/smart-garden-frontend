import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCoursePageComponent } from './explore-course-page.component';

describe('ExploreCoursePageComponent', () => {
  let component: ExploreCoursePageComponent;
  let fixture: ComponentFixture<ExploreCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreCoursePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
