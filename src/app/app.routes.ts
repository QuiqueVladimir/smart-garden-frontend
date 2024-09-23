import { Routes } from '@angular/router';
import {CourseListComponent} from "./smartGarden/components/course-list/course-list.component";
import {CourseDetailComponent} from "./smartGarden/components/course-detail/course-detail.component";
import {ModuleDetailComponent} from "./smartGarden/components/module-detail/module-detail.component";

export const routes: Routes = [
  {
    path: "list",
    component: CourseListComponent
  },
  {
    path: "course/:courseId",
    component: CourseDetailComponent
  },
  {
    path: "courses/:courseId/modules/:moduleId",
    component: ModuleDetailComponent
  }
];
