import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private toastr: ToastrService
  ) {
    // Inicializar el formulario de edición de usuario
    this.userForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
    });

    // Inicializar el formulario de cambio de contraseña
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  // Cargar los datos del usuario en el formulario
  loadUserData() {
    this.cuentaService.getCuenta().subscribe((user) => {
      this.userForm.patchValue({
        nombre_usuario: user.nombre_usuario,
        email: user.email,
        nombres: user.nombres,
        apellidos: user.apellidos,
      });
    });
  }

  // Validar que las contraseñas coincidan
  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notSame: true };
  }

  // Manejar la actualización de datos del usuario
  onSubmitUserForm() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);


      // this.cuentaService.updateCuenta(this.userForm.value).subscribe(
      //   () => this.toastr.success('Datos actualizados correctamente'),
      //   () => this.toastr.error('Error al actualizar los datos')
      // );
    }
  }

  // Manejar el cambio de contraseña
  onSubmitPasswordForm() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      // this.cuentaService.updatePassword(this.passwordForm.value).subscribe(
      //   () => this.toastr.success('Contraseña actualizada correctamente'),
      //   () => this.toastr.error('Error al actualizar la contraseña')
      // );
    }
  }
}
