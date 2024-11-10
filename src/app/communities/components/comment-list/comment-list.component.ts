import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from "../../services/comment/comment.service";
import {CommentE} from "../../models/comment-entity";
import {CommentCardComponent} from "../comment-card/comment-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {CommentInputComponent} from "../comment-input/comment-input.component";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    CommentCardComponent,
    MatButtonModule,
    NgForOf,
    NgIf,
    CommentInputComponent
  ],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit{
  @Input() publicationId!: number;
  @Output() reply = new EventEmitter<number>();
  comments: CommentE[] = [];
  visibleComments: CommentE[] = [];
  commentsToShow = 2;

  constructor(private commentService: CommentService) {}
  ngOnInit(): void{
    this.loadComments();
  }
  loadComments(): void{
    this.commentService.getCommentsByPublicationId(this.publicationId).subscribe((data: CommentE[]) => {
      this.comments = data;
      this.updateVisibleComments();
    })
  }

  updateVisibleComments(): void{
    this.visibleComments = this.comments.slice(0, this.commentsToShow);
  }
  viewMore(): void {
    this.commentsToShow += 2;
    this.updateVisibleComments();
  }
  handleReply(commentId: number): void {
    this.reply.emit(commentId);
  }
}
