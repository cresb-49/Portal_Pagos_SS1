import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { OtherService, PayloadUserRegister } from '../../services/other/other.service';
import { ApiResponse, ErrorApiResponse } from '../../services/http/http.service';

interface Usuario {
  id_usuario: number;
  nombre_usuario: string;
  nombres: string;
  apellidos: string;
  email: string;
  cuenta?: {
    numero_cuenta: string;
    saldo: number;
  };
  create_at: Date;
  update_at: Date;
  delete_at?: Date;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  editForm: FormGroup;
  changePasswordForm: FormGroup;
  currentPage = 1;
  itemsPerPage = 10;
  enEdicion = false;
  usuarioEnEdicion: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private otherService: OtherService,
    private toastr: ToastrService
  ) {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      validator: this.passwordsMatch
    });

    this.editForm = this.fb.group({
      nombre_usuario: ['', [Validators.required, Validators.minLength(3)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.changePasswordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      validator: this.passwordsMatch
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  // Cargar lista de usuarios con datos de cuenta
  loadUsuarios() {
    this.otherService.getClientes().subscribe({
      next: (response: ApiResponse) => {
        const data = response.data;
        this.usuarios = data;
      },
      error: (error: ErrorApiResponse) => {
        this.toastr.error(error.error, 'Error al cargar los usuarios');
      }
    })
  }

  // Función para verificar si las contraseñas coinciden
  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Crear nuevo usuario
  crearUsuario() {
    if (this.usuarioForm.valid) {
      const { confirm_password, ...data } = this.usuarioForm.value;
      const payload: PayloadUserRegister = {
        nombres: data.nombres,
        email: data.email,
        password: data.password,
        apellidos: data.apellidos
      }
      this.otherService.signUpCliente(payload).subscribe({
        next: () => {
          this.toastr.success('Usuario creado exitosamente');
          this.loadUsuarios();
          this.usuarioForm.reset();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al crear el usuario');
        }
      });
    } else {
      this.toastr.error('Por favor, complete todos los campos', 'Error al crear el administrador');
    }
  }

  // Eliminar usuario
  eliminarUsuario(id: number | undefined) {
    if (!id) {
      this.toastr.error('No se ha proporcionado un ID válido', 'Error al eliminar el administrador');
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.otherService.deleteCliente(id).subscribe({
          next: () => {
            this.toastr.success('Usuario eliminado exitosamente');
            this.loadUsuarios();
          },
          error: (error: ErrorApiResponse) => {
            this.toastr.error(error.error, 'Error al eliminar el usuario');
          }
        });
      }
    });
  }

  // Iniciar edición
  iniciarEdicion(usuario: Usuario) {
    this.enEdicion = true;
    this.usuarioEnEdicion = usuario;
    this.editForm.patchValue({
      nombre_usuario: usuario.nombre_usuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email
    });
  }

  // Guardar edición
  guardarEdicion() {
    if (this.editForm.valid && this.usuarioEnEdicion) {
      const updatedData = this.editForm.value;
      if (!this.usuarioEnEdicion.id_usuario) {
        this.toastr.error('No se ha proporcionado un ID válido', 'Error al editar el administrador');
        return;
      }
      this.otherService.updateCliente(this.usuarioEnEdicion.id_usuario, updatedData).subscribe({
        next: () => {
          this.toastr.success('Usuario actualizado exitosamente');
          this.loadUsuarios();
          this.cancelarEdicion();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al editar el usuario');
        }
      });
    }
  }

  cambiarContrasena() {
    if (this.changePasswordForm.valid && this.usuarioEnEdicion) {
      const { current_password, password } = this.changePasswordForm.value;
      if (!this.usuarioEnEdicion.id_usuario) {
        this.toastr.error('No se ha proporcionado un ID válido', 'Error al cambiar la contraseña');
        return;
      }
      this.otherService.updatePassword(this.usuarioEnEdicion.id_usuario, {
        current_password: current_password,
        new_password: password
      }).subscribe({
        next: () => {
          this.toastr.success('Contraseña actualizada exitosamente');
          this.changePasswordForm.reset();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al cambiar la contraseña');
        }
      });
    } else {
      //Mostrar los errores del formulario en la notificación
      console.log(this.changePasswordForm.errors);
      this.toastr.error('Formulario no válido', 'Error al cambiar la contraseña');
    }
  }

  cancelarEdicion() {
    this.enEdicion = false;
    this.usuarioEnEdicion = null;
    this.editForm.reset();
  }

  // Cambiar página para la paginación
  cambiarPagina(pagina: number) {
    this.currentPage = pagina;
  }

  // Obtener los usuarios de la página actual
  get usuariosPaginados() {
    const inicio = (this.currentPage - 1) * this.itemsPerPage;
    const fin = inicio + this.itemsPerPage;
    return this.usuarios.slice(inicio, fin);
  }
}
