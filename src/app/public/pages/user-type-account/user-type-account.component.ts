import { Component } from '@angular/core';
import { User, UserService } from "../../../shared/services/user.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";

@Component({
  selector: 'app-user-type-account',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './user-type-account.component.html',
  styleUrl: './user-type-account.component.css'
})
export class UserTypeAccountComponent {
  isExpert: boolean = false;  // Controla si el usuario es un experto o aprendiz
  experience: string = '';  // Campo para la experiencia del usuario
  timeToDedicate: string = '';  // Campo para el tiempo que el usuario dedicará
  targetAgeRange: string = '';  // Campo para el rango de edad objetivo (solo para expertos)
  password: string = '';  // Nuevo campo para la contraseña del usuario

  // Datos iniciales del usuario pasados desde el formulario anterior
  name: string = '';
  surname: string = '';
  email: string = '';
  message: string = '';

  /**
   * Constructor for UserTypeAccountComponent
   * @param {Router} router - Router to handle navigation
   * @param {UserService} userService - Service to handle user operations
   * @description Initializes the component and retrieves the user's data from navigation state.
   */
  constructor(private router: Router, private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      name: string,
      surname: string,
      email: string,
      message: string
    };

    if (state) {
      this.name = state.name;
      this.surname = state.surname;
      this.email = state.email;
      this.message = state.message;
    }
  }

  /**
   * Selects the learner option for the user
   * @returns {void}
   * @description Sets the `isExpert` flag to false when the user selects the learner option.
   */
  selectLearner(): void {
    this.isExpert = false;
  }

  /**
   * Selects the expert option for the user
   * @returns {void}
   * @description Sets the `isExpert` flag to true when the user selects the expert option.
   */
  selectExpert(): void {
    this.isExpert = true;
  }

  /**
   * Handles form submission and registers the user
   * @returns {void}
   * @description
   * Retrieves the current list of users, calculates a new ID for the new user, and registers the
   * user in the system by calling the `registerUser` method from the `UserService`.
   */
  onSubmit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      let newId = '1';  // ID inicial por defecto como string

      // Si ya hay usuarios, encontramos el ID más alto y lo incrementamos
      if (users.length > 0) {
        const maxId = users.reduce((max, user) => Math.max(max, Number(user.id)), 0);
        newId = (maxId + 1).toString();  // Convertimos el nuevo ID en string
      }

      // Asignar el nuevo ID y crear el objeto usuario
      const newUser: User = {
        id: newId,  // ID como string
        name: this.name,
        surname: this.surname,
        email: this.email,
        message: this.message,
        password: this.password,  // Agregamos la contraseña
        type: this.isExpert ? 'expert' : 'learner',  // Define el tipo de usuario
        experience: this.experience,
        timeToDedicate: this.timeToDedicate,
        targetAgeRange: this.isExpert ? this.targetAgeRange : undefined  // Solo para expertos
      };

      // Llamar al servicio para registrar al usuario
      this.userService.registerUser(newUser).subscribe({
        next: (response: User) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/login']);  // Navega al login tras el registro
        },
        error: (err: any) => console.error('Error al registrar el usuario:', err)
      });
    });
  }
}
