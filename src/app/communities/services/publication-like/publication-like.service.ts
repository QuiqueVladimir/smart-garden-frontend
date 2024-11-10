import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {PublicationLike} from "../../models/publication-like-entity";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicationLikeService extends BaseService<PublicationLike>{
  constructor() {
    super('/publicationLikes');
  }

  getPublicationLikes(publicationId: number): Observable<PublicationLike[]> {
    return this.http.get<PublicationLike[]>(`${this.resourcePath()}?publicationId=${publicationId}`, this.httpOptions);
  }
  addPublicationLike(publicationLike: PublicationLike): Observable<PublicationLike> {
    return this.create(publicationLike);
  }
  removePublicationLike(id: number): Observable<void> {
    return this.delete(id);
  }
}
