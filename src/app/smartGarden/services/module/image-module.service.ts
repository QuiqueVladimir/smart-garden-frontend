import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {ImageModule} from "../../models/image-module-entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageModuleService extends BaseService<ImageModule>{
  constructor() {
    super('/imagesModule');
  }

  getImagesByModuleId(moduleId: number): Observable<ImageModule[]>{
    return this.http.get<ImageModule[]>(`${this.resourcePath()}?moduleId=${moduleId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  addImageModule(imageModule: ImageModule): Observable<ImageModule>{
    return this.create(imageModule);
  }

  updateModule(id: number, module: ImageModule): Observable<ImageModule> {
    return this.http.put<ImageModule>(`${this.resourcePath}/${id}`, module, this.httpOptions);
  }

}
