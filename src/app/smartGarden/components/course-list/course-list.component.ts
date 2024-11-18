import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Course} from "../../../shared/models/course/course.entity";
import {CourseCardComponent} from "../course-card/course-card.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PageEvent} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CourseCardComponent,
    MatPaginatorModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Input() loading = false;
  paginatedCourses: Course[] = [];
  pageSize = 4;
  coursesPerPage = 12;

  constructor() {}

  ngOnInit() {
    this.updatePaginatedCourses({ pageIndex: 0, pageSize: this.coursesPerPage, length: this.courses.length });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courses']) {
      this.updatePaginatedCourses({ pageIndex: 0, pageSize: this.coursesPerPage, length: this.courses.length });
    }
  }

  updatePaginatedCourses(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedCourses = this.courses.slice(startIndex, endIndex);
  }

}

