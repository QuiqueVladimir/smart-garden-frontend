import { Component, Inject } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle
    ],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, name: string, redirectUrl: string },
    private router: Router
  ) {
    setTimeout(() => {
      this.goToCourse();
    }, 5000);
  }

  onClose(): void {
    this.goToCourse();
  }

  goToCourse(): void {
    this.dialogRef.close();
    this.router.navigate([this.data.redirectUrl]);
  }
}
