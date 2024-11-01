import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";

import {LoginComponent} from "./public/pages/login/login.component";
import {CreateAccountComponent} from "./public/pages/create-account/create-account.component";
import {RestorePasswordComponent} from "./public/pages/restore-password/restore-password.component";
import {NewPasswordComponent} from "./public/pages/new-password/new-password.component";
import {UserTypeAccountComponent} from "./public/pages/user-type-account/user-type-account.component";
import {PurchasedCoursesComponent} from "./smartGarden/components/purchased-courses/purchased-courses.component";
import {ManagementSubscriptionPageComponent} from "./subscriptions/pages/management-subscription-page/management-subscription-page.component";
/**/
import {CourseListComponent} from "./smartGarden/components/course-list/course-list.component";
import {CourseDetailComponent} from "./smartGarden/components/course-detail/course-detail.component";
import {ModuleDetailComponent} from "./smartGarden/components/module-detail/module-detail.component";
import {UserHomePageComponent} from "./public/pages/user-home-page/user-home-page.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./auth.guard";


export const routes: Routes = [
  { path: 'login',            component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'create',           component: CreateAccountComponent, canActivate: [AuthGuard]},
  { path: 'restore',          component: RestorePasswordComponent, canActivate: [AuthGuard]},
  { path: 'new-password',     component: NewPasswordComponent, canActivate: [AuthGuard]},
  { path: 'user-type',        component: UserTypeAccountComponent, canActivate: [AuthGuard]},
  { path: '', component: UserHomePageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: CourseListComponent},
      { path: 'home', redirectTo: 'list'},
      { path: "list", component: CourseListComponent},
      { path: "course/:courseId", component: CourseDetailComponent},
      { path: "courses/:courseId/modules/:moduleId",  component: ModuleDetailComponent},
      { path: "subscriptions", component: ManagementSubscriptionPageComponent},
    ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

