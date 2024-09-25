import {Component, Input} from '@angular/core';
import {Course} from "../../models/course.entity";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!: Course;
  constructor(private router: Router) {}
  viewDetails(): void{
    this.router.navigate(['/course', this.course.id]);
  }
}
