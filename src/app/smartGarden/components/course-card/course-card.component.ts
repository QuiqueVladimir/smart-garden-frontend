import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../../shared/models/course/course.entity";
import {
  MatCardModule
} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {NgIf, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    SlicePipe,
    NgIf
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit{
  @Input() course!: Course;
  isCollectionRoute: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isCollectionRoute = this.router.url.includes('/collection');
  }
  viewDetails(): void{
    this.router.navigate(['/course/detail/', this.course.id]);
  }

  goLearn(): void{
    this.router.navigate(['/course-content/', this.course.id]);
  }

}
