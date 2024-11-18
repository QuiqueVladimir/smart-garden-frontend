import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {CommentLike} from "../../models/comment-like-entity";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentLikeService extends BaseService<CommentLike>{
  constructor() {
    super('/commentLikes');
  }

  getCommentLikes(commentId: number): Observable<CommentLike[]> {
    return this.http.get<CommentLike[]>(`${this.resourcePath()}?commentId=${commentId}`, this.httpOptions);
  }

  addCommentLike(commentLike: CommentLike): Observable<CommentLike> {
    return this.create(commentLike);
  }

  removeCommentLike(id: number): Observable<void> {
    return this.delete(id);
  }
}
