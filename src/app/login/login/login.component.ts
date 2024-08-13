import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const rol = await this.userService.login(email, password);
        if (rol == 'admin') {
          this.router.navigate(['/admin']); // Redirige a la ruta deseada
        } else {
          this.router.navigate(['/']);
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Manejo del error, como mostrar un mensaje de error al usuario
      }
    }
  }
  
}
