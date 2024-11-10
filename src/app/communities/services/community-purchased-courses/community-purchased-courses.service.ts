import { Injectable } from '@angular/core';
import {PurchasedCourse} from "../../../shared/models/purchased-course/purchased-course-entity";
import {Community} from "../../models/community-entity";
import {BaseService} from "../../../shared/services/base.service";
import {PurchasedCoursesService} from "../../../smartGarden/services/purchased/purchased-courses.service";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunityPurchasedCoursesService extends BaseService<PurchasedCourse>{
  constructor(private purchasedCoursesService: PurchasedCoursesService) {
    super('/purchasedCourses');
  }

  getPurchasedCoursesAndCommunityActiveByUserId(userId: number): Observable<PurchasedCourse[]>{
    return this.purchasedCoursesService.getPurchasedCoursesByUserId(userId).pipe(
      map(courses => courses.filter(course => course.communityAccess === 'active')),
      catchError(error => {
        console.error('Error fetching purchased courses', error);
        return of([]);
      })
    );
  }

  hasAccessToCommunity(userId: number, communityId: number): Observable<boolean>{
    return this.purchasedCoursesService.hasCommunityAccess(userId, communityId);
  }

  private getCommunityById(id: number): Observable<Community[]> {
    return this.http.get<Community[]>(`/communities`)
  }

}
