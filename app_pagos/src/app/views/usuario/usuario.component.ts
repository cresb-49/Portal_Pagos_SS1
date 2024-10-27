import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CommonModule } from '@angular/common';

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
  currentPage = 1;
  itemsPerPage = 10;
  enEdicion = false;
  usuarioEnEdicion: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {
    this.usuarioForm = this.fb.group({
      nombre_usuario: ['', [Validators.required, Validators.minLength(3)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id_rol: [1, Validators.required], // Asumimos que es un rol de usuario predeterminado
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

  // Cargar lista de usuarios con datos de cuenta
  loadUsuarios() {
    // this.usuarioService.getUsuarios().subscribe(
    //   (data: Usuario[]) => {
    //     this.usuarios = data;
    //   },
    //   () => this.toastr.error('Error al cargar los usuarios')
    // );
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
      // this.usuarioService.createUsuario(data).subscribe(
      //   () => {
      //     this.toastr.success('Usuario creado exitosamente');
      //     this.loadUsuarios();
      //     this.usuarioForm.reset();
      //   },
      //   () => this.toastr.error('Error al crear el usuario')
      // );
    }
  }

  // Eliminar usuario
  eliminarUsuario(id: number) {
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
        // this.usuarioService.deleteUsuario(id).subscribe(
        //   () => {
        //     this.toastr.success('Usuario eliminado exitosamente');
        //     this.loadUsuarios();
        //   },
        //   () => this.toastr.error('Error al eliminar el usuario')
        // );
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
      // this.usuarioService.updateUsuario(this.usuarioEnEdicion.id_usuario, updatedData).subscribe(
      //   () => {
      //     this.toastr.success('Usuario actualizado exitosamente');
      //     this.loadUsuarios();
      //     this.cancelarEdicion();
      //   },
      //   () => this.toastr.error('Error al actualizar el usuario')
      // );
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
