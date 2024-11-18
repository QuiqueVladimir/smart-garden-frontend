import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";

import {LoginComponent} from "./public/pages/login/login.component";
import {CreateAccountComponent} from "./public/pages/create-account/create-account.component";
import {RestorePasswordComponent} from "./public/pages/restore-password/restore-password.component";
import {NewPasswordComponent} from "./public/pages/new-password/new-password.component";
import {UserTypeAccountComponent} from "./public/pages/user-type-account/user-type-account.component";
import {ManagementSubscriptionPageComponent} from "./subscriptions/pages/management-subscription-page/management-subscription-page.component";
/**/
import {CourseListComponent} from "./smartGarden/components/course-list/course-list.component";
import {CommunityPageComponent} from "./communities/pages/community-page/community-page.component";
import {CourseDetailComponent} from "./smartGarden/components/course-detail/course-detail.component";
import {ModuleDetailComponent} from "./smartGarden/components/module-detail/module-detail.component";
import {UserHomePageComponent} from "./public/pages/user-home-page/user-home-page.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./auth.guard";
import {
  CommunitiesManagementPageComponent
} from "./communities/pages/communities-management-page/communities-management-page.component";
import {MyCollectionPageComponent} from "./smartGarden/pages/my-collection-page/my-collection-page.component";
import {ExploreCoursePageComponent} from "./smartGarden/pages/explore-course-page/explore-course-page.component";
import {CourseCreatePageComponent} from "./smartGarden/pages/course-create-page/course-create-page.component";
import {PreviewCoursePageComponent} from "./smartGarden/pages/preview-course-page/preview-course-page.component";
import {
  CourseContentViewPageComponent
} from "./smartGarden/pages/course-content-view-page/course-content-view-page.component";
import {WalletPageComponent} from "./wallet/pages/wallet-page/wallet-page.component";



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
      { path: 'explore', component: ExploreCoursePageComponent},
      { path: "collection", component: MyCollectionPageComponent},
      { path: "communities", component: CommunitiesManagementPageComponent},
      { path: "communities/:id", component: CommunityPageComponent},
      { path: "subscriptions", component: ManagementSubscriptionPageComponent},
      { path: "course/create", component: CourseCreatePageComponent},
      { path: "course-content/:courseId", component: CourseContentViewPageComponent},
      { path: "course/:courseId/module/:moduleId",  component: ModuleDetailComponent},
      { path: "course/detail/:courseId", component: PreviewCoursePageComponent},
      { path: "wallet", component: WalletPageComponent}
    ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

