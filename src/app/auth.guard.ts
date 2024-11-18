import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { UserService } from './shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.userService.isLoggedIn();
    const isAuthRoute = ['login', 'create', 'restore', 'new-password', 'user-type'].includes(route.routeConfig?.path || '');

    if (isLoggedIn && isAuthRoute) {
      this.router.navigate(['/']);
      return false;
    } else if (!isLoggedIn && !isAuthRoute) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
