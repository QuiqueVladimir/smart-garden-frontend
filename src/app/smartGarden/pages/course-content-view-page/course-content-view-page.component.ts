import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import { Course } from '../../../shared/models/course/course.entity';
import { Module } from '../../models/module.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course/course.service';
import { ModuleService } from '../../services/module/module.service';
import { CommunityService } from '../../../communities/services/community/community.service';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import {
  CommunityCreateDialogComponent
} from "../../../communities/components/community-create-dialog/community-create-dialog.component";

@Component({
  selector: 'app-course-content-view-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatToolbar,
    MatButton

  ],
  templateUrl: './course-content-view-page.component.html',
  styleUrl: './course-content-view-page.component.css'
})
export class CourseContentViewPageComponent implements OnInit{
  course: Course = {} as Course;
  modules: Module[] = [];
  courseId: number;
  userId: number;
  isOwner: boolean = false;
  hasCommunity: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private moduleService: ModuleService,
    private communityService: CommunityService,
    private dialog: MatDialog
  ) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id;
    this.courseId = this.route.snapshot.params['courseId'];
  }

  ngOnInit(): void {
    this.courseService.getCourseById(this.courseId).subscribe((course: Course) => {
      this.course = course;
      this.isOwner = this.course.expertId === this.userId;
      this.checkCommunityStatus();
    });
    this.moduleService.getModulesByCurseId(this.courseId).subscribe((modules: Module[]) => {
      this.modules = modules;
    });
  }

  navigateToCommunity(): void {
    if (this.hasCommunity) {
      this.router.navigate([`/communities/${this.course.communityId}`]);
    } else {
      this.openCreateCommunityDialog(this.userId, this.courseId);
    }
  }

  private checkCommunityStatus() {
    this.communityService.getCommunityByCourseId(this.courseId).subscribe((community) => {
      this.hasCommunity = !!community;
    });
  }
  navigateToModule(moduleId: number): void {
    this.router.navigate([`/course/${this.courseId}/module/${moduleId}`]);
  }
  openCreateCommunityDialog(expertId: number, courseId: number): void {
    const dialogRef = this.dialog.open(CommunityCreateDialogComponent, {
      data: {expertId, courseId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.reload();
      }
    });

  }

}
