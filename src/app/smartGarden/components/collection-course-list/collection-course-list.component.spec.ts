import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCourseListComponent } from './collection-course-list.component';

describe('CollectionCourseListComponent', () => {
  let component: CollectionCourseListComponent;
  let fixture: ComponentFixture<CollectionCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionCourseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
