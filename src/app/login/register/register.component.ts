import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router,private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Validador para confirmar que las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    console.log(this.registerForm.valid)
    if (this.registerForm.valid) {
      // Procesar la forma
      console.log('Formulario Enviado', this.registerForm.value);
      const { email, password, firstName, lastName } = this.registerForm.value;
      this.userService.registerUser(email, password, "user", firstName, lastName)
        .then(() => {
          Swal.fire("Se ha registrado correctamente");
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error(error);
          Swal.fire("Ha ocurrido un error 😢");
        });
    }
  }
}
