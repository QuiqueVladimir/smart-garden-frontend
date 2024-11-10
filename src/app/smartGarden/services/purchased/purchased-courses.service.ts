import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {catchError, map, Observable, of, retry} from "rxjs";
import {PurchasedCourse} from "../../../shared/models/purchased-course/purchased-course-entity";

@Injectable({
  providedIn: 'root'
})
export class PurchasedCoursesService extends BaseService<PurchasedCourse>{
  constructor() {
    super('/purchasedCourses');
  }

  getPurchasedCoursesByUserId(userId: number): Observable<PurchasedCourse[]> {
    return this.http.get<PurchasedCourse[]>(`${this.resourcePath()}?userId=${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  hasCommunityAccess(userId: number, courseId: number): Observable<boolean> {
    return this.http.get<PurchasedCourse[]>(`${this.resourcePath()}?userId=${userId}&courseId=${courseId}`)
      .pipe(
        map(courses => courses.some(course => course.communityAccess === 'active')),
        catchError(error => {
          console.error('Error checking community access', error);
          return of(false);
        })
      );
  }

}
