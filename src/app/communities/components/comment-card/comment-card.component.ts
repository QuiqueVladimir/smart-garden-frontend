import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {CommentE} from "../../models/comment-entity";
import {DatePipe} from "@angular/common";
import {CommentLikeService} from "../../services/comment-like/comment-like.service";
import {CommentLike} from "../../models/comment-like-entity";
import {CommentService} from "../../services/comment/comment.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    DatePipe,
    NgClass
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {
  @Input() commentE!: CommentE;
  @Output() reply = new EventEmitter<number>();
  likedByUser: Boolean = false;
  userId: number;

  constructor(private commentLikeService: CommentLikeService, private commentService: CommentService) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  ngOnInit(): void {
    this.checkIfLikedBuUser();
  }

  replyToComment(): void {
    this.reply.emit(this.commentE.id);
  }

  toggleLike(): void {
    if (!this.userId) return;

    if (this.likedByUser) {
      this.commentLikeService.getCommentLikes(this.commentE.id).subscribe(likes => {
        const userLike = likes.find(like => like.userId === this.userId);
        if (userLike) {
          this.commentLikeService.removeCommentLike(userLike.id).subscribe(() => {
            this.likedByUser = false;
            this.updateLikeCount(this.commentE.id, this.commentE.numberLikes - 1);
          });
        }
      });
    } else {
      const newLike: CommentLike = {
        id: 0,
        userId: this.userId,
        commentId: this.commentE.id,
        date: new Date()
      };
      this.commentLikeService.addCommentLike(newLike).subscribe(() => {
        this.likedByUser = true;
        this.updateLikeCount(this.commentE.id, this.commentE.numberLikes + 1);
      });
    }
  }
  private checkIfLikedBuUser(): void {
    if(!this.userId) return;
    this.commentLikeService.getCommentLikes(this.commentE.id).subscribe(likes =>{
      this.likedByUser = likes.some(like => like.userId === this.userId);
    })
  }
  private updateLikeCount(commentId: number, likeCount: number): void {
    this.commentService.updateLikeCount(commentId, likeCount).subscribe(() => {
      this.commentE.numberLikes = likeCount;
    });
  }
}
