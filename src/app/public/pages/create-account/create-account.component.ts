import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  name: string = '';  // Campo para almacenar el nombre ingresado por el usuario
  surname: string = '';  // Campo para almacenar el apellido ingresado por el usuario
  email: string = '';  // Campo para almacenar el correo electrónico ingresado por el usuario
  message: string = '';  // Campo para almacenar el mensaje ingresado por el usuario

  /**
   * Constructor for CreateAccountComponent
   * @param {Router} router - Servicio de enrutamiento para manejar la navegación
   * @description Inicializa el componente e inyecta el servicio Router.
   */
  constructor(private router: Router) {}

  /**
   * Navigate to the User Type selection page
   * @returns {void}
   * @description
   * Navega a la página de selección de tipo de usuario (/user-type), pasando los datos
   * del usuario como parámetros de estado (name, surname, email, message).
   */
  onUserType(): void {
    // Navegar a la selección de tipo de usuario, pasando los datos del usuario en el estado de navegación
    this.router.navigate(['/user-type'], {
      state: {
        name: this.name,
        surname: this.surname,
        email: this.email,
        message: this.message
      }
    });
  }
}
