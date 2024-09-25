import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Course} from "../../models/course.entity";
import {Module} from "../../models/module.entity";
import {catchError, Observable, retry} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {
  constructor() {
    super('/courses');
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

  public addModule(courseId: number, module: Module): Observable<Module>{
    return this.http.post<Module>(`${this.resourcePath()}/${courseId}/modules`, JSON.stringify(module), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public deleteModule(courseId: number, moduleId: number): Observable<void>{
    return this.http.delete<void>(`${this.resourcePath()}/${courseId}/modules/${moduleId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}


