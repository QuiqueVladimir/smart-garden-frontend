import {Component, OnInit} from '@angular/core';
import {CourseListComponent} from "../../components/course-list/course-list.component";
import {MatToolbar} from "@angular/material/toolbar";
import { Course } from '../../../shared/models/course/course.entity';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course/course.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-explore-course-page',
  standalone: true,
  imports: [
    CourseListComponent,
    MatToolbar,
    MatButton,
    NgIf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './explore-course-page.component.html',
  styleUrl: './explore-course-page.component.css'
})
export class ExploreCoursePageComponent implements OnInit{
  searchQuery: string='';
  courses: Course[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.searchQuery = params['search'] || '';
      this.searchCourses();
    });
  }

  searchCourses(): void {
    this.loading = true;
    if (this.searchQuery.trim() === '') {
      this.courseService.getAll().subscribe((courses: Course[]) => {
        this.courses = courses;
        this.loading = false;
      });
    } else {
      this.courseService.searchCourses(this.searchQuery).subscribe((courses: Course[]) => {
        this.courses = courses;
        console.log(this.courses);
        this.loading = false;
      });
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.router.navigate(['/explore'], { queryParams: { search: '' } });
  }
}
