import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { User, UserService } from "../../../shared/services/user.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.css'
})
export class RestorePasswordComponent {
  email: string = '';  // Campo para almacenar el correo electrónico ingresado por el usuario

  /**
   * Constructor for RestorePasswordComponent
   * @param {Router} router - Router to handle navigation
   * @param {UserService} userService - Service to handle user operations
   * @description Initializes the component and injects the Router and UserService.
   */
  constructor(private router: Router, private userService: UserService) {}

  /**
   * Handle the form submission to restore password
   * @param {Event} event - The event triggered by the form submission
   * @returns {void}
   * @description
   * Prevents the default form submission behavior, searches for the user by email,
   * and if found, navigates to the password reset page. If not found, it shows an alert.
   */
  onSubmitEmail(event: Event): void {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    console.log('Correo ingresado:', this.email);  // Log para verificar el correo

    this.userService.getUserByEmail(this.email).subscribe({
      next: (user: User | undefined) => {
        if (user) {
          console.log('Usuario encontrado:', user);  // Verifica que se encontró el usuario
          this.router.navigate(['/new-password'], { state: { email: this.email } });  // Navegar a la página de nueva contraseña
        } else {
          alert("No se encontró el usuario con el correo proporcionado.");  // Alerta si no se encuentra el correo
        }
      },
      error: (error) => {
        console.error('Error al buscar usuario:', error);  // Log para mostrar el error en la búsqueda
        alert("Hubo un error al intentar buscar el usuario.");  // Alerta de error
      }
    });
  }
}
