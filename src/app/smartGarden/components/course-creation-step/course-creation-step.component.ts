import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-course-creation-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    NgIf,
    MatInput,
    CdkTextareaAutosize
  ],
  templateUrl: './course-creation-step.component.html',
  styleUrl: './course-creation-step.component.css'
})
export class CourseCreationStepComponent {
  courseForm: FormGroup;
  imageUrl: string = '';

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      image: ['', [Validators.required, Validators.maxLength(800)]],
      price: ['', [Validators.required, Validators.min(4.99), Validators.max(199)]],
    });

    this.courseForm.get('image')?.valueChanges.subscribe(value => {
      this.imageUrl = value;
    });

  }
}
