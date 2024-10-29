import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OtherService } from '../../services/other/other.service';
import { ApiResponse, ErrorApiResponse } from '../../services/http/http.service';
import { AuthService } from '../../services/auth/auth.service';

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
  accountForm: FormGroup;

  usuario_id: number = 0;
  cuenta_id: number = 0;

  selected_entidad_financiera: number = 0;


  // Arrays para entidades financieras y empresas
  entidadesFinancieras = [
    { id: 1, nombre: 'Portal Financiero Cuentas Bancarias' },
    { id: 2, nombre: 'Portal Financiero Tarjeta de crédito' },
  ];

  empresas = [
    { id: 1, nombre: 'Empresa ABC' },
    { id: 2, nombre: 'Corporación XYZ' },
    { id: 3, nombre: 'Servicios Globales S.A.' }
    // Agrega más según tus necesidades
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cuentaService: CuentaService,
    private otherService: OtherService,
    private toastr: ToastrService
  ) {
    // Formulario de edición de usuario
    this.userForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
    });

    // Formulario de cambio de contraseña
    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, { validator: this.checkPasswords });

    // Formulario de edición de cuenta
    this.accountForm = this.fb.group({
      numero_cuenta: ['', this.noWhitespaceValidator()],
      id_entidad_financiera: [''], // Valor opcional
    }, {
      validator: this.checkAcountNumberIfEntidadFinancieraIsSelected
    });
  }

  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const original_lenght = (control.value ?? '').length;
      const trimmed_lenght = (control.value ?? '').trim().length;
      if (original_lenght === trimmed_lenght) {
        return null;
      }
      return { whitespace: true };
    };
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  // Cargar los datos del usuario
  loadUserData() {
    this.otherService.getProfile().subscribe({
      next: (response: ApiResponse) => {
        const data = response.data;
        this.usuario_id = data.id_usuario;
        this.userForm.patchValue({
          nombre_usuario: data.nombre_usuario,
          email: data.email,
          nombres: data.nombres,
          apellidos: data.apellidos
        });
        if (this.isCliente()) {
          const cuenta = data.cuenta;
          this.cuenta_id = cuenta.id_cuenta;
          this.accountForm.patchValue({
            numero_cuenta: cuenta.numero_cuenta ?? '',
            id_entidad_financiera: cuenta.id_entidad_financiera ?? 0
          });
        }
      },
      error: (error: ErrorApiResponse) => {
        this.toastr.error(error.error, 'Error al cargar los datos del usuario');
      }
    });
  }

  // Validación de contraseña
  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notSame: true };
  }

  checkAcountNumberIfEntidadFinancieraIsSelected(group: FormGroup) {
    const entidad_financiera = Number(group.get('id_entidad_financiera')?.value ?? 0);
    const numero_cuenta = group.get('numero_cuenta')?.value ?? '';
    if (entidad_financiera !== 0) {
      if (numero_cuenta.length === 0) {
        return { acountrequired: true };
      }
      return null;
    } else {
      if (numero_cuenta.length !== 0) {
        return { acountrequired: true };
      }
      return null;
    }
  }

  // Actualizar datos del usuario
  onSubmitUserForm() {
    if (this.userForm.valid) {
      if (this.usuario_id === 0) {
        this.toastr.error('No se ha proporcionado un ID válido', 'Error al cambiar la contraseña');
        return;
      }
      const updateData = this.userForm.value;
      this.otherService.updateCliente(this.usuario_id, updateData).subscribe({
        next: () => {
          this.toastr.success('Datos del usuario actualizados correctamente');
          this.loadUserData();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al actualizar los datos del usuario');
        }
      });
    }
  }

  // Actualizar datos de la cuenta
  onSubmitAccountForm() {
    if (this.accountForm.valid) {
      const updateData = this.accountForm.value;
      const numero_cuenta = updateData.numero_cuenta ?? '';
      const id_entidad_financiera = Number(updateData.id_entidad_financiera);
      const payload = {
        numero_cuenta: numero_cuenta.length === 0 ? null : numero_cuenta,
        id_entidad_financiera: id_entidad_financiera === 0 ? null : id_entidad_financiera
      };
      if (this.cuenta_id === 0) {
        this.toastr.error('No se ha proporcionado un ID válido', 'Error al actualizar los datos de la cuenta');
        return;
      }
      this.otherService.updateCuenta(this.cuenta_id, payload).subscribe({
        next: () => {
          this.toastr.success('Datos de la cuenta actualizados correctamente');
          this.loadUserData();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al actualizar los datos de la cuenta');
        }
      });
    } else {
      this.toastr.error('Formulario no válido', 'Error al actualizar los datos de la cuenta');
    }
  }

  // Actualizar contraseña
  onSubmitPasswordForm() {
    if (this.passwordForm.valid) {
      const { current_password, password } = this.passwordForm.value;
      if (this.usuario_id === 0) {
        this.toastr.error('No se ha proporcionado un ID válido', 'Error al cambiar la contraseña');
        return;
      }
      this.otherService.updatePassword(this.usuario_id, {
        current_password: current_password,
        new_password: password
      }).subscribe({
        next: () => {
          this.toastr.success('Contraseña actualizada exitosamente');
          this.passwordForm.reset();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al cambiar la contraseña');
        }
      });
    } else {
      //Mostrar los errores del formulario en la notificación
      console.log(this.passwordForm.errors);
      this.toastr.error('Formulario no válido', 'Error al cambiar la contraseña');
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isCliente(): boolean {
    return this.authService.isCliente();
  }
}
