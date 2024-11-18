import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-course-published-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './course-published-dialog.component.html',
  styleUrl: './course-published-dialog.component.css'
})
export class CoursePublishedDialogComponent {

  constructor(private router: Router) {}

  goToCourses(): void {
    this.router.navigate(['/collection']);
  }

}
