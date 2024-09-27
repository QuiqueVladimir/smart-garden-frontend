import { Injectable } from '@angular/core';
import {Course} from "../../models/course.entity";
import {BaseService} from "../../../shared/services/base.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PurchasedCoursesService extends BaseService<Course>{
  constructor(http: HttpClient) {
    super('/purchased_courses');
    this.http = http;
  }
  getPurchasedCourses(userId: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.resourcePath()}?userId=${userId}`);
  }
}
