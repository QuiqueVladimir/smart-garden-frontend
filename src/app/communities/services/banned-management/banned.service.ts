import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Banned} from "../../models/banned-entity";
import {catchError, map, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannedService extends BaseService<Banned>{

  constructor() {
    super('/bannedUserCommunity');
  }

  userIsBanned(userId: number, communityId: number): Observable<boolean> {
    return this.http.get<boolean[]>(`${this.resourcePath()}?userId=${userId}&communityId=${communityId}`)
      .pipe(
        retry(2),
        map(response => response.length > 0),
        catchError(() => of(false))
      );
  }

}
