import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { User, UserService } from "../../../shared/services/user.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
  email: string = '';  // Campo para almacenar el email ingresado por el usuario
  password: string = '';  // Campo para almacenar la contraseña ingresada por el usuario
  errorMessage: string = '';  // Campo para mostrar mensajes de error si las credenciales son incorrectas

  /**
   * Constructor for LoginComponent
   * @param {Router} router - Inyectamos el servicio de enrutamiento para manejar la navegación
   * @param {UserService} userService - Servicio de usuario para manejar la autenticación
   * @description Inicializa el componente e inyecta las dependencias necesarias.
   */
  constructor(private router: Router, private userService: UserService) {}

  /**
   * Handle form submission to log in
   * @param {Event} event - El evento de envío del formulario
   * @returns {void}
   * @description
   * Evita el comportamiento predeterminado del formulario, verifica si los campos están completos,
   * busca el usuario por correo, y si las credenciales coinciden, redirige a la página de inicio (/home).
   * Muestra un mensaje de error si las credenciales no son correctas o si ocurre un problema.
   */
  onSubmitLogin(event: Event): void {
    event.preventDefault();

    if (this.email && this.password) {
      this.userService.getUserByEmail(this.email).subscribe({
        next: (user: User | undefined) => {
          if (user && user.password === this.password) {
            sessionStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/home']);
          } else {

            this.errorMessage = 'El email o la contraseña no son correctos.';
          }
        },
        error: () => {
          this.errorMessage = 'Hubo un error al procesar el inicio de sesión.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }

  /**
   * Navigate to the Create Account page
   * @returns {void}
   * @description Navega a la página de creación de cuenta (/create).
   */
  onCreateAccount(): void {
    this.router.navigate(['/create']);
  }

  /**
   * Navigate to the Restore Password page
   * @returns {void}
   * @description Navega a la página de restauración de contraseña (/restore).
   */
  onForgotPassword(): void {
    this.router.navigate(['/restore']);
  }
}
