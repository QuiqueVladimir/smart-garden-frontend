import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommunityService} from "../../services/community/community.service";
import {Community} from "../../models/community-entity";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-community-edit-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './community-edit-dialog.component.html',
  styleUrl: './community-edit-dialog.component.css'
})
export class CommunityEditDialogComponent{
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private communityService: CommunityService,
    private dialogRef: MatDialogRef<CommunityEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { community: Community }
  ){
    this.editForm = this.fb.group({
      title: [data.community.title, Validators.required],
      description: [data.community.description, Validators.required],
      image: [data.community.image]
    });
  }

  save(): void{
    if(this.editForm.valid){
      const updateCommunity = { ...this.data.community, ...this.editForm.value };
      this.communityService.updateCommunity(updateCommunity.id, updateCommunity).subscribe(() =>{
        this.dialogRef.close(updateCommunity);
      });
    }
  }
  cancel(): void{
    this.dialogRef.close();
  }

}
