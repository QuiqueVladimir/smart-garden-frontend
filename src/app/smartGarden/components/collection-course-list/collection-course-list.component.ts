import { Component } from '@angular/core';
import {CourseCardComponent} from "../course-card/course-card.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgForOf, NgIf} from "@angular/common";
import {Course} from "../../../shared/models/course/course.entity";
import {CourseService} from "../../services/course/course.service";
import {PurchasedCoursesService} from "../../services/purchased/purchased-courses.service";
import {forkJoin} from "rxjs";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-collection-course-list',
  standalone: true,
  imports: [
    CourseCardComponent,
    MatPaginator,
    MatTab,
    MatTabGroup,
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './collection-course-list.component.html',
  styleUrl: './collection-course-list.component.css'
})
export class CollectionCourseListComponent {
  userId: number;
  userType: string;
  purchasedCourses: Course[] = [];
  paginatedPurchasedCourses: Course[] = [];
  publishedCourses: Course[] = [];
  paginatedPublishedCourses: Course[] = [];
  coursesPerPage = 9;

  constructor(private courseService: CourseService,
              private purchasedCoursesService: PurchasedCoursesService,
              private router: Router) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
    this.userType = user.type || null;
  }

  ngOnInit(): void {
    this.loadPurchasedCourses();
    if(this.isExpert()) {
      this.loadPublishedCourses();
    }
  }

  loadPurchasedCourses(): void {
    this.purchasedCoursesService.getPurchasedCoursesByUserId(this.userId).subscribe((purchasedCourses) => {
      const courseDetailsObservable = purchasedCourses.map(purchasedCourse =>
        this.courseService.getCourseById(purchasedCourse.courseId)
      );
      forkJoin(courseDetailsObservable).subscribe((courses: Course[]) =>{
        this.purchasedCourses = courses;
        this.updatePaginatedPurchasedCourses({pageIndex: 0, pageSize: this.coursesPerPage});
      });
    });
  }

  loadPublishedCourses(): void {
    this.courseService.getCoursePublishedByExpertId(this.userId).subscribe((courses: Course[]) => {
      this.publishedCourses = courses;
      this.updatePaginatedPublishedCourses({pageIndex: 0, pageSize: this.coursesPerPage});
    })
  }

  updatePaginatedPurchasedCourses(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedPurchasedCourses = this.purchasedCourses.slice(startIndex, endIndex);
  }

  updatePaginatedPublishedCourses(event: any): void{
    const startIndex = event.pageIndex * event .pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedPublishedCourses = this.publishedCourses.slice(startIndex, endIndex);
  }

  isExpert(): boolean {
    if(this.userType==='expert') return true;
    else return false;
  }

  redirectToExplore(): void {
    this.router.navigate(['/explore']);
  }

}
