import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";

import {LoginComponent} from "./public/pages/login/login.component";
import {CreateAccountComponent} from "./public/pages/create-account/create-account.component";
import {RestorePasswordComponent} from "./public/pages/restore-password/restore-password.component";
import {NewPasswordComponent} from "./public/pages/new-password/new-password.component";
import {UserTypeAccountComponent} from "./public/pages/user-type-account/user-type-account.component";
import {SubscriptionComponent} from "./profile/components/subscription/subscription.component";
import {PurchasedCoursesComponent} from "./smartGarden/components/purchased-courses/purchased-courses.component";
/**/
import {CourseListComponent} from "./smartGarden/components/course-list/course-list.component";
import {CourseDetailComponent} from "./smartGarden/components/course-detail/course-detail.component";
import {ModuleDetailComponent} from "./smartGarden/components/module-detail/module-detail.component";


export const routes: Routes = [

  {path: 'home', component: CourseListComponent},
  { path: 'login',            component: LoginComponent},
  { path: 'create',           component: CreateAccountComponent},
  { path: 'restore',          component: RestorePasswordComponent},
  { path: 'new-password',     component: NewPasswordComponent},
  { path: 'user-type',        component: UserTypeAccountComponent},
  { path: "list", component: CourseListComponent},
  { path: "course/:courseId", component: CourseDetailComponent},
  { path: "courses/:courseId/modules/:moduleId",  component: ModuleDetailComponent},
  { path: "explore",  component: CourseListComponent},
  {path: "subscriptions", component: SubscriptionComponent},
  { path: "collection",  component: PurchasedCoursesComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

];

