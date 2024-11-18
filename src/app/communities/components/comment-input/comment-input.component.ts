import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommentService} from "../../services/comment/comment.service";
import {PublicationService} from "../../services/publication/publication.service";
import {CommentE} from "../../models/comment-entity";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.css'
})
export class CommentInputComponent implements OnInit{
  @Input() publicationId!: number;
  @Input() parentCommentId: number | null = null;
  @ViewChild('commentBox') commentBox!: ElementRef;

  userId: number;
  commentForm!: FormGroup;
  showImageUrlInput = false;

  constructor(private fb: FormBuilder, private commentService: CommentService, private publicationService: PublicationService) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
      imageUrl: ['']
    });
  }

  toggleImageUrlInput(): void{
    this.showImageUrlInput = !this.showImageUrlInput;
  }

  submitComment(): void{
    if(this.commentForm.valid){
      const newComment: CommentE ={
        id: 0,
        userId: this.userId,
        publicationId: this.publicationId,
        content: this.commentForm.value.content,
        imageUrl: this.commentForm.value.imageUrl,
        date: new Date(),
        parentCommentId: this.parentCommentId,
        numberLikes: 0,
        numberResponses: 0
      };
      this.commentService.createComment(newComment).subscribe(() =>{
        this.commentForm.reset();
        this.showImageUrlInput = false;
        this.parentCommentId = null;
        this.commentService.getCommentsByPublicationId(this.publicationId).subscribe(comments =>{
          const commentCount = comments.length;
          this.publicationService.updateCommentCount(this.publicationId, commentCount).subscribe();
        });
      })
    }
  }

  focusCommentBox(): void{
    this.commentBox.nativeElement.focus();
    this.commentBox.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  cancelReply(): void{
    this.parentCommentId = null;
  }
}
