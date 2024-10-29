import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { OtherService } from '../../services/other/other.service';
import { CommonModule } from '@angular/common';
import { ApiResponse, ErrorApiResponse } from '../../services/http/http.service';

interface Usuario {
  id_usuario?: number;
  nombre_usuario: string;
  nombres: string;
  apellidos: string;
  email: string;
  id_rol: number;
  create_at?: Date;
  update_at?: Date;
  delete_at?: Date;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  usuarios: Usuario[] = [];
  adminForm: FormGroup;
  editForm: FormGroup;
  currentPage = 1;
  itemsPerPage = 10;
  enEdicion = false;
  usuarioEnEdicion: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private otherService: OtherService,
    private toastr: ToastrService
  ) {
    this.adminForm = this.fb.group({
      nombre_usuario: ['', [Validators.required, Validators.minLength(3)]],
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
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  // Cargar lista de usuarios
  loadUsuarios() {
    this.otherService.getAdmins().subscribe({
      next: (response: ApiResponse) => {
        const data = response.data;
        this.usuarios = data;
      },
      error: (error: ErrorApiResponse) => {
        this.toastr.error(error.error, 'Error al cargar los administradores');
      }
    });
  }

  // Función para verificar si las contraseñas coinciden
  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Crear nuevo administrador
  crearAdministrador() {
    if (this.adminForm.valid) {
      const { confirm_password, ...data } = this.adminForm.value;
      this.otherService.createAdmin(data).subscribe({
        next: (response: ApiResponse) => {
          this.toastr.success('Administrador creado exitosamente');
          this.loadUsuarios();
          this.adminForm.reset();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al crear el administrador');
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
        this.otherService.deleteAdmin(id).subscribe({
          next: () => {
            this.toastr.success('Administrador eliminado exitosamente');
            this.loadUsuarios();
          },
          error: (error: ErrorApiResponse) => {
            this.toastr.error(error.error, 'Error al eliminar el administrador');
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
      //VAlidamos que el usaurio tenga id
      if (!this.usuarioEnEdicion.id_usuario) {
        this.toastr.error('No se ha proporcionado un ID válido', 'Error al editar el administrador');
        return;
      }
      this.otherService.updateAdmin(this.usuarioEnEdicion.id_usuario, updatedData).subscribe({
        next: () => {
          this.toastr.success('Administrador actualizado exitosamente');
          this.loadUsuarios();
          this.cancelarEdicion();
        },
        error: (error: ErrorApiResponse) => {
          this.toastr.error(error.error, 'Error al actualizar el administrador');
        }
      });
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
