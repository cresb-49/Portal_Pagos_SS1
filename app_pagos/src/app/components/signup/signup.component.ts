import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { OtherService, PayloadUserRegister } from '../../services/other/other.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorApiResponse } from '../../services/http/http.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  @Input() registroEmpresa: boolean = false;
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private otherService: OtherService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: this.passwordsMatch
    });
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnInit() {
    //Si el usuario ya está autenticado, redirigirlo a la página de inicio
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  clearForm() {
    this.signupForm.reset();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const payload: PayloadUserRegister = {
        nombres: this.signupForm.value.nombres,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        apellidos: this.signupForm.value.apellidos
      }
      this.otherService.signUpCliente(payload).subscribe({
        next: () => {
          this.toastr.success('Registro exitoso');
          this.clearForm();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al registrarse');
        }
      });
    }
  }
}
