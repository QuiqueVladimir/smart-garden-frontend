import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, mergeMap, Observable } from "rxjs";

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
export class UserService {
  private apiUrl = 'http://localhost:3000/users';  // URL de la API (json-server)

  constructor(private http: HttpClient) {}

  /**
   * Get all users from the server
   * @returns {Observable<User[]>} - An observable that emits the list of users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Register a new user by making a POST request
   * @param {User} user - The user object to be registered
   * @returns {Observable<User>} - An observable that emits the newly created user
   */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  /**
   * Find a user by email
   * @param {string} email - The email to search for
   * @returns {Observable<User | undefined>} - An observable that emits the found user or undefined
   */
  getUserByEmail(email: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users[0])  // Return the first user that matches the email
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
          const userId = user.id;  // Keep the ID as string
          const updatedUser = { ...user, password: newPassword };  // Update only the password
          console.log(`Updating user with id: ${userId} at URL: ${this.apiUrl}/${userId}`);
          return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser);  // Make the PUT request with the updated data
        } else {
          throw new Error('User not found');
        }
      })
    );
  }
}
