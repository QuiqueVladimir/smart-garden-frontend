import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
@Component({
  selector: 'app-access-denied-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './access-denied-dialog.component.html',
  styleUrl: './access-denied-dialog.component.css'
})
export class AccessDeniedDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, redirectUrl: string },
    private dialogRef: MatDialogRef<AccessDeniedDialogComponent>,
    private router: Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
    this.router.navigate([this.data.redirectUrl]);
  }
}
