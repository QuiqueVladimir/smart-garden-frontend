import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Course} from "../../models/course.entity";
import {Module} from "../../models/module.entity";
import {catchError, Observable, retry} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course>{
  constructor() {
    super();
    this.resourceEndPoint = '/courses';
  }

  public getModules(courseId: number): Observable<Module[]>{
    return this.http.get<Module[]>(`${this.resourcePath()}/${courseId}/modules`, this.httpOptions)
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


