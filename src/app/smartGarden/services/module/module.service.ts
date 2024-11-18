import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Module} from "../../models/module.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends BaseService<Module>{

  constructor() {
    super('/modules');
  }

  public getModulesByCurseId(courseId: number): Observable<Module[]>{
    return this.http.get<Module[]>(`${this.resourcePath()}?courseId=${courseId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getModuleById(moduleId: number): Observable<Module> {
    return this.http.get<Module>(`${this.resourcePath()}?moduleId=${moduleId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public addModule(module: Module): Observable<Module>{
    return this.create(module);
  }

}
