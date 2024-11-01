import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, mergeMap, Observable } from "rxjs";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";

export interface User {
  id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  message: string;
  type: string;
  experience: string;
  timeToDedicate: string;
  targetAgeRange?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor(http: HttpClient, private router: Router) {
    super('/users');
    this.http = http;
  }
  /**
   * Get all users from the server
   * @returns {Observable<User[]>} - An observable that emits the list of users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.resourcePath());
  }

  /**
   * Register a new user by making a POST request
   * @param {User} user - The user object to be registered
   * @returns {Observable<User>} - An observable that emits the newly created user
   */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.resourcePath(), user);
  }

  /**
   * Find a user by email
   * @param {string} email - The email to search for
   * @returns {Observable<User | undefined>} - An observable that emits the found user or undefined
   */
  getUserByEmail(email: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${this.resourcePath()}?email=${email}`).pipe(
      map(users => users[0])
    );
  }

  /**
   * Update the password of a user based on their email
   * @param {string} email - The email of the user whose password is being updated
   * @param {string} newPassword - The new password to set
   * @returns {Observable<User>} - An observable that emits the updated user
   */
  updatePassword(email: string, newPassword: string): Observable<User> {
    return this.getUserByEmail(email).pipe(
      mergeMap(user => {
        if (user && user.id) {
          const userId = user.id;
          const updatedUser = { ...user, password: newPassword };
          return this.update(userId, updatedUser);
        } else {
          throw new Error('User not found');
        }
      })
    );
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
  logout(): void{
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']).then(()=>{
      window.location.reload();
    });
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User[]>(`${this.resourcePath()}?id=${id}`).pipe(
      map(users => users[0]) // Tomar el primer usuario que coincida con el ID
    );
  }
}
