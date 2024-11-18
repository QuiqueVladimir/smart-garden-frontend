import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {CourseCreationStepComponent} from "../../components/course-creation-step/course-creation-step.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ModuleCreationStepComponent} from "../../components/module-creation-step/module-creation-step.component";
import {MatDivider} from "@angular/material/divider";
import {CheckStepComponent} from "../../components/check-step/check-step.component";
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {CourseService} from "../../services/course/course.service";
import {ModuleService} from "../../services/module/module.service";
import {ImageModuleService} from "../../services/module/image-module.service";
import { Course } from '../../../shared/models/course/course.entity';
import { ImageModule } from '../../models/image-module-entity';
import { Module } from "../../models/module.entity";
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {
  CoursePublishedDialogComponent
} from "../../components/course-published-dialog/course-published-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-course-create-page',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    CourseCreationStepComponent,
    ModuleCreationStepComponent,
    ReactiveFormsModule,
    MatDivider,
    CheckStepComponent,
    MatIcon,
    MatToolbar,
    NgIf
  ],
  templateUrl: './course-create-page.component.html',
  styleUrl: './course-create-page.component.css'
})
export class CourseCreatePageComponent implements OnInit{
  @ViewChild(CourseCreationStepComponent) courseCreationStep!: CourseCreationStepComponent;
  @ViewChild(ModuleCreationStepComponent) moduleCreationStep!: ModuleCreationStepComponent;
  @ViewChild('stepper') stepper!: MatStepper;

  courseTitle: string = '';
  courseDescription: string = '';
  courseImage: string = '';
  coursePrice: number = 0;
  moduleTitles: string[] = [];
  userId: number;

  constructor(
    private courseService: CourseService,
    private moduleService: ModuleService,
    private imageModuleService: ImageModuleService,
    private dialog: MatDialog,
    private router: Router
  ){
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  ngOnInit(): void {}

  collectCourseData(): void {
    this.courseTitle = this.courseCreationStep.courseForm.get('title')?.value;
    this.courseDescription = this.courseCreationStep.courseForm.get('description')?.value;
    this.courseImage = this.courseCreationStep.courseForm.get('image')?.value;
    this.coursePrice = this.courseCreationStep.courseForm.get('price')?.value;
    this.moduleTitles = this.moduleCreationStep.moduleForm.get('modules')?.value.map((module: any) => module.title);
  }

  onStepChange(event: StepperSelectionEvent): void {
    if (event.selectedIndex === 1 && (!this.courseCreationStep.courseForm.valid)) {
      this.stepper.selectedIndex = 0;
    } else if (event.selectedIndex === 2 && (!this.moduleCreationStep.moduleForm.valid || this.moduleTitles.length === 0)) {
      this.stepper.selectedIndex = 1;
    }
  }

  publishCourse(): void {
    const course: Course = {
      id: 0,
      title: this.courseTitle,
      description: this.courseDescription,
      image: this.courseImage,
      expertId: this.userId,
      communityId: null,
      price: this.coursePrice,
      rating: 0,
      numberModules: this.moduleTitles.length
    };

    this.courseService.addCourse(course).subscribe(createdCourse => {
      const courseId = createdCourse.id;
      const modules = this.moduleCreationStep.moduleForm.get('modules')?.value;

      modules.forEach((module: any, index: number) => {
        const newModule: Module = {
          id: 0,
          courseId: courseId,
          title: module.title,
          description: module.description,
          video: module.urlVideo,
          transcription: module.transcription,
          order: index + 1
        };

        this.moduleService.addModule(newModule).subscribe(createdModule => {
          const moduleId = createdModule.id;
          const images = module.images;

          images.forEach((image: any) => {
            const newImage: ImageModule = {
              id: 0,
              moduleId: moduleId,
              title: image.title,
              imageUrl: image.url,
              description: image.description,
              createdAt: new Date()
            };
            this.imageModuleService.addImageModule(newImage).subscribe();
          });
        });
      });
      const dialogRef = this.dialog.open(CoursePublishedDialogComponent);
      setTimeout(() =>{
        dialogRef.close();
        this.router.navigate(['/collection']);
      }, 5000);
    });
  }

  cancelOperation(): void {
    this.router.navigate(['/collection']);
  }

}
