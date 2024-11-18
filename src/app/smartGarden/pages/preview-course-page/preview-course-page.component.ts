import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {NgForOf, NgIf} from "@angular/common";
import {Module} from "../../models/module.entity";
import {Course} from "../../../shared/models/course/course.entity";
import {CourseService} from "../../services/course/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {ModuleService} from "../../services/module/module.service";
import {PurchaseComponent} from "../../../public/components/purchase/purchase.component";
import {PurchasedCoursesService} from "../../services/purchased/purchased-courses.service";
import {MatDialog} from "@angular/material/dialog";
import { SuccessDialogComponent } from '../../../public/components/success-dialog/success-dialog.component';

@Component({
  selector: 'app-preview-course-page',
  standalone: true,
  imports: [
    MatButton,
    MatToolbar,
    NgIf,
    NgForOf,
    MatAccordion,
    MatExpansionModule,
    PurchaseComponent
  ],
  templateUrl: './preview-course-page.component.html',
  styleUrl: './preview-course-page.component.css'
})
export class PreviewCoursePageComponent implements OnInit{
  modules: Module[] = [];
  courseId: number;
  userId: number;
  course: Course = {} as Course;

  constructor(private courseService: CourseService,
              private moduleService: ModuleService,
              private purchasedCoursesService: PurchasedCoursesService,
              private route:ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id;
    this.courseId= this.route.snapshot.params['courseId'];
  }

  ngOnInit(): void {
    this.courseService.getCourseById(this.courseId).subscribe((course: Course) => {
      this.course = course;
      this.checkIfUserIsOwner();
      this.checkIfUserPurchased();
    });
    this.moduleService.getModulesByCurseId(this.courseId).subscribe((modules: Module[]) => {
      this.modules = modules;
    });
  }

  private checkIfUserIsOwner() {
    if(this.course.expertId === this.userId) {
      this.openSuccessDialog('You are the owner of this course.');
    }
  }

  private checkIfUserPurchased() {
    this.purchasedCoursesService.userHasThisCourse(this.userId, this.courseId).subscribe((hasCourse: boolean) => {
      if(hasCourse) {
        this.openSuccessDialog('You have already purchased this course.');
      }
    });
  }
  private openSuccessDialog(message: string) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: { message, name: 'course' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([`/course-content/${this.courseId}`]);
    });
  }

}
