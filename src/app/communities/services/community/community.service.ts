import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Community} from "../../models/community-entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunityService extends BaseService<Community>{
  constructor() {
    super('/communities');
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
