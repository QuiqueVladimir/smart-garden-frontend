import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course.entity";
import {PurchasedCoursesService} from "../../services/purchased/purchased-courses.service";
import {NgForOf, NgIf} from "@angular/common";
import {CourseCardComponent} from "../course-card/course-card.component";
import {MatPaginator} from "@angular/material/paginator";
import {CourseService} from "../../services/course/course.service";

@Component({
  selector: 'app-purchased-courses',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CourseCardComponent,
    MatPaginator
  ],
  templateUrl: './purchased-courses.component.html',
  styleUrl: './purchased-courses.component.css'
})
export class PurchasedCoursesComponent implements OnInit{
  purchasedCourses: Course[] = [];
  listCourses: Course[] = [];
  totalCourses: number = 0;
  coursesPerPage: number = 6;
  currentPage: number = 0;
  constructor(private purchasedCoursesService: PurchasedCoursesService, private courseService: CourseService) { }

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const userId = user.id;

    if (userId) {
      this.purchasedCoursesService.getPurchasedCourses(userId).subscribe((purchasedCurses: any[]) => {
        const courseIds = purchasedCurses
        this.totalCourses = this.purchasedCourses.length;
        this.paginateCourses();
      });
    }
}
  paginateCourses(): void {
    const startIndex = this.currentPage * this.coursesPerPage;
    const endIndex = startIndex + this.coursesPerPage;
    this.listCourses = this.purchasedCourses.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.paginateCourses();
  }
}
