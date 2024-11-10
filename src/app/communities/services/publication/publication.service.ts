import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Publication} from "../../models/publication-entity";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicationService extends BaseService<Publication>{

  constructor() {
    super('/publications');
  }
  getPublicationsByCommunityId(communityId: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.resourcePath()}?communityId=${communityId}`, this.httpOptions);
  }
  createPublication(publication: Publication): Observable<Publication>{
    return this.create(publication);
  }

  updateCommentCount(publicacionId: number, commentCount: number): Observable<any> {
    return this.http.patch(`${this.resourcePath()}/${publicacionId}`, {numberComments: commentCount}, this.httpOptions);
  }

  updateLikeCount(publicationId: number, likeCount: number): Observable<any>{
    return this.http.patch(`${this.resourcePath()}/${publicationId}`, {numberLikes: likeCount}, this.httpOptions)
  }

}
