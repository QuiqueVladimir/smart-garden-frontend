import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Observable, switchMap} from "rxjs";
import {CommentE} from "../../models/comment-entity";


@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService<CommentE> {
  constructor() {
    super('/comments');
  }
  getCommentsByPublicationId(publicationId: number): Observable<CommentE[]> {
    return this.http.get<CommentE[]>(`${this.resourcePath()}?publicationId=${publicationId}`, this.httpOptions);
  }

  createComment(commentE: CommentE): Observable<CommentE> {
    return this.create(commentE);
  }

  updateLikeCount(commentId: number, likeCount: number): Observable<any> {
    return this.http.patch(`${this.resourcePath()}/${commentId}`, { numberLikes: likeCount }, this.httpOptions);
  }
}
