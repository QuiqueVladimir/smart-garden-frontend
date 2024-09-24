import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../shared/services/user.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  newPassword: string = '';  // Campo para almacenar la nueva contraseña ingresada
  confirmNewPassword: string = '';  // Campo para confirmar la nueva contraseña
  email: string = '';  // Correo electrónico del usuario para el cual se está cambiando la contraseña

  /**
   * Constructor for NewPasswordComponent
   * @param {Router} router - Router to handle navigation
   * @param {UserService} userService - Service to handle user operations
   * @description Initializes the component, retrieves the email from navigation state,
   * or redirects to the restore page if no email is provided.
   */
  constructor(private router: Router, private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();

    // Verificar si se pasó el email a través del estado de navegación
    if (navigation?.extras.state && navigation.extras.state['email']) {
      this.email = navigation.extras.state['email'];
    } else {
      // Si no se recibió el email, redirigir al formulario de recuperación de contraseña
      console.error('No se recibió ningún email. Redirigiendo al formulario de reset.');
      this.router.navigate(['/restore']);
    }
  }

  /**
   * Handle form submission to update the password
   * @param {Event} event - The event triggered by the form submission
   * @returns {void}
   * @description
   * Prevents the default form submission behavior, checks if the passwords match, and
   * calls the `updatePassword` method from the `UserService` to update the user's password.
   */
  onSubmitNewPassword(event: Event): void {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

    // Verificar si las contraseñas ingresadas coinciden
    if (this.newPassword === this.confirmNewPassword) {
      // Actualizar la contraseña del usuario
      this.userService.updatePassword(this.email, this.newPassword).subscribe({
        next: () => {
          alert('Contraseña actualizada correctamente.');  // Mostrar mensaje de éxito
          this.router.navigate(['/login']);  // Redirigir al login
        },
        error: (err) => {
          console.error('Error al actualizar la contraseña:', err);  // Mostrar error en la consola
          alert('Error al actualizar la contraseña.');  // Mostrar mensaje de error
        }
      });
    } else {
      // Mostrar mensaje si las contraseñas no coinciden
      alert('Las contraseñas no coinciden.');
    }
  }
}
