import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Community} from "../../models/community-entity";
import {catchError, map, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunityService extends BaseService<Community>{
  constructor() {
    super('/communities');
  }

  getCommunityStatus(communityId: number): Observable<string> {
    return this.http.get<string>(`${this.resourcePath()}/${communityId}/status`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  addCommunity(community: Community): Observable<Community> {
    return this.create(community);
  }

  getCommunityByCourseId(courseId: number): Observable<Community> {
    return this.http.get<Community | Community[]>(`${this.resourcePath()}?courseId=${courseId}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError),
      map(response => Array.isArray(response) ? response[0] : response)
    );
  }

  getCommunityById(id: number): Observable<Community> {
    return this.http.get<Community>(`${this.resourcePath()}/${id}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  getCommunitiesByExpertId(expertId: number): Observable<Community[]> {
    return this.http.get<Community[]>(`${this.resourcePath()}?expertId=${expertId}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  updateCommunity(id:number, community: Community): Observable<Community>{
    return this.http.put<Community>(`${this.resourcePath()}/${id}`, community, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
