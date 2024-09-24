import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {AboutComponent} from "./public/pages/about/about.component";
import {HomeComponent} from "./public/pages/home/home.component";
import {LoginComponent} from "./public/pages/login/login.component";
import {CreateAccountComponent} from "./public/pages/create-account/create-account.component";
import {RestorePasswordComponent} from "./public/pages/restore-password/restore-password.component";
import {NewPasswordComponent} from "./public/pages/new-password/new-password.component";
import {UserTypeAccountComponent} from "./public/pages/user-type-account/user-type-account.component";

export const routes: Routes = [
  { path: 'home',             component: HomeComponent },
  { path: 'about',            component: AboutComponent },
  { path: 'login',            component: LoginComponent},
  { path: 'create',           component: CreateAccountComponent},
  { path: 'restore',          component: RestorePasswordComponent},
  { path: 'new-password',     component: NewPasswordComponent},
  { path: 'user-type',        component: UserTypeAccountComponent},
  { path: '',                 redirectTo: 'login', pathMatch: 'full' },
  { path: '**',               component: PageNotFoundComponent }
];
