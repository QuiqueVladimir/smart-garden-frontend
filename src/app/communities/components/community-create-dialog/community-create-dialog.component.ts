import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommunityService} from "../../services/community/community.service";
import {Community} from "../../models/community-entity";
import {CourseService} from "../../../smartGarden/services/course/course.service";

@Component({
  selector: 'app-community-create-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './community-create-dialog.component.html',
  styleUrl: './community-create-dialog.component.css'
})
export class CommunityCreateDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private communityService: CommunityService,
    private dialogRef: MatDialogRef<CommunityCreateDialogComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: { expertId: number, courseId:number}
  ){
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const newCommunity: Community = {
        id:0,
        expertId: this.data.expertId,
        courseId: Number(this.data.courseId),
        title: this.editForm.value.title,
        description: this.editForm.value.description,
        image: this.editForm.value.image,
        status: 'available',
        fixedMessageId: 0
      };
      this.communityService.addCommunity(newCommunity).subscribe((createdCommunity) => {
        this.updateCourseCommunityId(createdCommunity.id);
        this.dialogRef.close(createdCommunity);
      });
    }
  }

  cancel(): void{
    this.dialogRef.close();
  }
  private updateCourseCommunityId(communityId: number): void {
    this.courseService.updateCourse(this.data.courseId, {communityId}).subscribe(() => {
      location.reload();
    });
  }
}
