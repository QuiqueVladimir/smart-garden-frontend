import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../services/course/course.service";
import {Course} from "../../models/course.entity";
import {Module} from "../../models/module.entity";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit{
  modules: Module[] = [];
  courseId: number;
  course: Course = {} as Course;

  constructor(private courseService: CourseService, private route:ActivatedRoute) {
    this.courseId= this.route.snapshot.params['courseId'];
  }

  ngOnInit():void {
    this.courseService.getModulesByCurseId(this.courseId).subscribe((modules: Module[]) => {
      this.modules = modules;
    });
    this.courseService.getCourseById(this.courseId).subscribe((course: Course) => {
      this.course = course;
    });
  }
}
