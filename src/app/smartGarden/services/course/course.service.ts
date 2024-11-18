import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Course} from "../../../shared/models/course/course.entity";
import {Module} from "../../models/module.entity";
import {catchError, Observable, retry} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {
  constructor() {
    super('/courses');
  }

  addCourse(course: Course): Observable<Course>{
    return this.create(course);
  }

  public getModulesByCurseId(courseId: number): Observable<Module[]>{
    return this.http.get<Module[]>(`${this.resourcePath()}/${courseId}/modules`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getModuleById(moduleId: number): Observable<Module> {
    return this.http.get<Module>(`${this.basePath}/modules/${moduleId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getCourseById(courseId: number): Observable<Course>{
    return this.http.get<Course>(`${this.resourcePath()}/${courseId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCoursesByIds(courseIds: number[]): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.resourcePath()}?ids=${courseIds.join(',')}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getCoursePublishedByExpertId(expertId: number): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.resourcePath()}?expertId=${expertId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public searchCourses(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.resourcePath()}?title=${query}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateCourse(courseId: number, updateData: Partial<Course>): Observable<Course> {
    return this.http.patch<Course>(`${this.resourcePath()}/${courseId}`, updateData);
  }
}


