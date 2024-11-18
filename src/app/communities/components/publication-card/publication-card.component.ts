import {Component, Input, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {Publication} from "../../models/publication-entity";
import {DatePipe} from "@angular/common";
import {CommentListComponent} from "../comment-list/comment-list.component";
import {CommentInputComponent} from "../comment-input/comment-input.component";
import {PublicationLikeService} from "../../services/publication-like/publication-like.service";
import {PublicationLike} from "../../models/publication-like-entity";
import {PublicationService} from "../../services/publication/publication.service";

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    DatePipe,
    CommentListComponent,
    CommentInputComponent,
    NgClass
  ],
  templateUrl: './publication-card.component.html',
  styleUrl: './publication-card.component.css'
})
export class PublicationCardComponent{
  @ViewChild(CommentInputComponent) commentInputComponent!: CommentInputComponent;
  @Input() publication!: Publication;
  replyingToCommentId: number | null = null;
  likedByUser: boolean = false;
  userId:number;

  constructor(private publicationLikeService: PublicationLikeService, private publicationService: PublicationService) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  ngOnInit(): void {
    this.checkIfLikedByUser();
  }

  handleReply(commentId: number): void{
    this.replyingToCommentId = commentId;
    this.focusCommentInput();
  }
  focusCommentInput(): void{
    this.commentInputComponent.focusCommentBox();
  }
  toggleLike(): void {
    if (!this.userId) return;

    if (this.likedByUser) {
      this.publicationLikeService.getPublicationLikes(this.publication.id).subscribe(likes => {
        const userLike = likes.find(like => like.userId === this.userId);
        if (userLike) {
          this.publicationLikeService.removePublicationLike(userLike.id).subscribe(() => {
            this.likedByUser = false;
            this.updateLikeCount(this.publication.id, this.publication.numberLikes - 1);
          });
        }
      });
    } else {
      const newLike: PublicationLike = {
        id: 0,
        userId: this.userId,
        publicationId: this.publication.id,
        date: new Date()
      };
      this.publicationLikeService.addPublicationLike(newLike).subscribe(() => {
        this.likedByUser = true;
        this.updateLikeCount(this.publication.id, this.publication.numberLikes + 1);
      });
    }
  }

  private checkIfLikedByUser(): void {
    if (!this.userId) return;
    this.publicationLikeService.getPublicationLikes(this.publication.id).subscribe(likes => {
      this.likedByUser = likes.some(like => like.userId === this.userId);
    });
  }

  private updateLikeCount(publicationId: number, likeCount: number): void {
    this.publicationService.updateLikeCount(publicationId, likeCount).subscribe(() =>{
      this.publication.numberLikes = likeCount;
    });
  }
}
