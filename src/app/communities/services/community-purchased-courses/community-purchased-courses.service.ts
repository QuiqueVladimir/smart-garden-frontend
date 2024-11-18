import { Injectable } from '@angular/core';
import {PurchasedCourse} from "../../../shared/models/purchased-course/purchased-course-entity";
import {Community} from "../../models/community-entity";
import {BaseService} from "../../../shared/services/base.service";
import {PurchasedCoursesService} from "../../../smartGarden/services/purchased/purchased-courses.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunityPurchasedCoursesService extends BaseService<PurchasedCourse>{
  constructor(private purchasedCoursesService: PurchasedCoursesService) {
    super('/purchasedCourses');
  }

  getPurchasedCoursesByUserId(userId: number): Observable<PurchasedCourse[]>{
    return this.purchasedCoursesService.getPurchasedCoursesByUserId(userId);
  }
  hasAccessToCommunity(userId: number, communityId: number): Observable<boolean>{
    return this.purchasedCoursesService.userHasThisCourse(userId, communityId);
  }

  private getCommunityById(id: number): Observable<Community[]> {
    return this.http.get<Community[]>(`/communities`)
  }

}
