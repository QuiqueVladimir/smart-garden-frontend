import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PublicationService} from "../../services/publication/publication.service";
import {Publication} from "../../models/publication-entity";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-publication-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './publication-input.component.html',
  styleUrl: './publication-input.component.css'
})
export class PublicationInputComponent implements OnInit {
  @Input() communityId!: number;

  userId: number;
  publicationForm!: FormGroup;
  showImageUrlInput = false;

  constructor(private fb: FormBuilder, private publicationService: PublicationService) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  ngOnInit(): void {
    this.publicationForm = this.fb.group({
      content: ['', Validators.required],
      imageUrl: ['']
    });
  }

  toggleImageUrlInput(): void {
    this.showImageUrlInput = !this.showImageUrlInput;
  }

  submitPublication(): void {
    if (this.publicationForm.valid) {
      const newPublication: Publication = {
        id: 0,
        userId: this.userId,
        communityId: this.communityId,
        content: this.publicationForm.value.content,
        imageUrl: this.publicationForm.value.imageUrl,
        date: new Date(),
        isPinned: false,
        numberLikes: 0,
        numberComments: 0
      };
      this.publicationService.createPublication(newPublication).subscribe(() => {
        this.publicationForm.reset();
        this.showImageUrlInput = false;
      })
    }
  }
}
