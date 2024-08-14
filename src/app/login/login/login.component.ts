import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const rol = await this.userService.login(email, password);
        if (rol === 'admin') {
          this.router.navigate(['/admin']); // Redirige a la ruta deseada
        } else if(rol === 'user') {
          this.router.navigate(['/']);
        } else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Correo o Contraseña incorrecta!"
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  }


}
