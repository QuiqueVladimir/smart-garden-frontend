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

  addPurchasedCourse(purchasedCourse: PurchasedCourse): Observable<PurchasedCourse> {
    return this.create(purchasedCourse);
  }

  getPurchasedCoursesByUserId(userId: number): Observable<PurchasedCourse[]> {
    return this.http.get<PurchasedCourse[]>(`${this.resourcePath()}?userId=${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPurchasesByCourseIds(courseIds: number[]): Observable<PurchasedCourse[]> {
    return this.http.get<PurchasedCourse[]>(`${this.resourcePath()}?courseIds=${courseIds.join(',')}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  userHasThisCourse(userId: number, courseId: number): Observable<boolean> {
    return this.http.get<boolean[]>(`${this.resourcePath()}?userId=${userId}&courseId=${courseId}`)
      .pipe(
        retry(2),
        map(response => response.length > 0),
        catchError(() => of(false))
      );
  }

}
