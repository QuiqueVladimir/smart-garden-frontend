import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-module-creation-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatFormFieldModule,
    MatInput,
    MatExpansionModule,
    MatButtonModule,
    MatLabel,
    NgIf,
    CdkTextareaAutosize,
    MatDivider
  ],
  templateUrl: './module-creation-step.component.html',
  styleUrl: './module-creation-step.component.css'
})
export class ModuleCreationStepComponent {
  moduleForm: FormGroup;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.moduleForm = this.fb.group({
      modules: this.fb.array([this.createModuleForm()])
    });

    this.moduleForm.get('modules')?.valueChanges.subscribe(modules => {
      modules.forEach((module: any, index: number) => {
        const urlControl = this.modules.at(index).get('urlVideo');
        if (urlControl) {
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlControl.value);
          this.modules.at(index).patchValue({safeVideoUrl: safeUrl}, {emitEvent: false});
        }
      });
    });
  }
  get modules(): FormArray {
    return this.moduleForm.get('modules') as FormArray;
  }

  createModuleForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      urlVideo: ['', [Validators.required, Validators.maxLength(800)]],
      transcription: ['', [Validators.maxLength(10000)]],
      safeVideoUrl: [''],
      images: this.fb.array([])
    });
  }

  addModule(): void {
    this.modules.push(this.createModuleForm());
  }

  removeModule(index: number): void {
    this.modules.removeAt(index);
  }

  addImage(moduleIndex: number): void {
    const images = this.modules.at(moduleIndex).get('images') as FormArray;
    images.push(this.createImageForm());
  }

  getImageControls(moduleIndex: number): FormArray {
    return (this.modules.at(moduleIndex).get('images') as FormArray);
  }

  createImageForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.maxLength(30)]],
      url: ['', [Validators.required, Validators.maxLength(800)]],
      description: ['', [Validators.maxLength(90)]]
    });
  }

  removeImage(moduleIndex: number, imageIndex: number): void {
    const images = this.modules.at(moduleIndex).get('images') as FormArray;
    images.removeAt(imageIndex);
  }

}
