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
  accountForm: FormGroup;

  // Arrays para entidades financieras y empresas
  entidadesFinancieras = [
    { id: 1, nombre: 'Banco de Guatemala' },
    { id: 2, nombre: 'Banrural' },
    { id: 3, nombre: 'Banco Industrial' },
    { id: 4, nombre: 'G&T Continental' }
    // Agrega más según tus necesidades
  ];

  empresas = [
    { id: 1, nombre: 'Empresa ABC' },
    { id: 2, nombre: 'Corporación XYZ' },
    { id: 3, nombre: 'Servicios Globales S.A.' }
    // Agrega más según tus necesidades
  ];

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
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
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    // Formulario de edición de cuenta
    this.accountForm = this.fb.group({
      numero_cuenta: ['', Validators.required],
      id_entidad_financiera: ['', Validators.required],
      id_empresa: [''] // Campo opcional
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadAccountData();
  }

  // Cargar los datos del usuario
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

  // Cargar los datos de la cuenta
  loadAccountData() {
    // this.cuentaService.getCuentaDetails().subscribe((account) => {
    //   this.accountForm.patchValue({
    //     numero_cuenta: account.numero_cuenta,
    //     id_entidad_financiera: account.id_entidad_financiera,
    //     id_empresa: account.id_empresa
    //   });
    // });
  }

  // Validación de contraseña
  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notSame: true };
  }

  // Actualizar datos del usuario
  onSubmitUserForm() {
    if (this.userForm.valid) {
      // this.cuentaService.updateCuenta(this.userForm.value).subscribe(
      //   () => this.toastr.success('Datos del usuario actualizados correctamente'),
      //   () => this.toastr.error('Error al actualizar los datos del usuario')
      // );
    }
  }

  // Actualizar datos de la cuenta
  onSubmitAccountForm() {
    if (this.accountForm.valid) {
      // this.cuentaService.updateCuentaDetails(this.accountForm.value).subscribe(
      //   () => this.toastr.success('Datos de la cuenta actualizados correctamente'),
      //   () => this.toastr.error('Error al actualizar los datos de la cuenta')
      // );
    }
  }

  // Actualizar contraseña
  onSubmitPasswordForm() {
    if (this.passwordForm.valid) {
      // this.cuentaService.updatePassword(this.passwordForm.value).subscribe(
      //   () => this.toastr.success('Contraseña actualizada correctamente'),
      //   () => this.toastr.error('Error al actualizar la contraseña')
      // );
    }
  }
}
