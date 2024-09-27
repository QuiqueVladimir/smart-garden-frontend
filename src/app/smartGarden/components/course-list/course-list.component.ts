import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {Course} from "../../models/course.entity";
import {CourseCardComponent} from "../course-card/course-card.component";
import {NgForOf} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CourseCardComponent,
    NgForOf,
    MatPaginator
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  listCourses: Course[] = [];
  totalCourses: number = 0;
  coursesPerPage: number = 6;
  currentPage: number = 0;
constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  this.courseService.getAll().subscribe((courses: Course[]) => {
    this.courses = courses;
    this.totalCourses = this.courses.length;
    this.paginateCourses();
  });
  }

  paginateCourses(): void{
  const startIndex = this.currentPage * this.coursesPerPage;
  const endIndex = startIndex + this.coursesPerPage;
  this.listCourses = this.courses.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void{
  this.currentPage = event.pageIndex;
  this.paginateCourses();
  }
}
