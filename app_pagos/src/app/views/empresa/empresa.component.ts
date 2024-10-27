import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OtherService } from '../../services/other/other.service';
import { ToastrService } from 'ngx-toastr';


interface Empresa {
  id_empresa: number;
  nombre: string;
  create_at: Date;
  update_at: Date;
  delete_at?: Date;
}


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresas: Empresa[] = [];
  empresaForm: FormGroup;
  editForm: FormGroup;
  currentPage = 1;
  itemsPerPage = 10;
  enEdicion = false;
  empresaEnEdicion: Empresa | null = null;

  constructor(
    private fb: FormBuilder,
    private otherService: OtherService,
    private toastr: ToastrService
  ) {
    this.empresaForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas() {
    // this.otherService.getEmpresas().subscribe(
    //   (data: Empresa[]) => {
    //     this.empresas = data;
    //   },
    //   () => this.toastr.error('Error al cargar las empresas')
    // );
  }

  crearEmpresa() {
    if (this.empresaForm.valid) {
      // this.otherService.createEmpresa(this.empresaForm.value).subscribe(
      //   () => {
      //     this.toastr.success('Empresa creada exitosamente');
      //     this.loadEmpresas();
      //     this.empresaForm.reset();
      //   },
      //   () => this.toastr.error('Error al crear la empresa')
      // );
    }
  }

  eliminarEmpresa(id: number) {
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
        // this.otherService.deleteEmpresa(id).subscribe(
        //   () => {
        //     this.toastr.success('Empresa eliminada exitosamente');
        //     this.loadEmpresas();
        //   },
        //   () => this.toastr.error('Error al eliminar la empresa')
        // );
      }
    });
  }

  iniciarEdicion(empresa: Empresa) {
    this.enEdicion = true;
    this.empresaEnEdicion = empresa;
    this.editForm.patchValue({ nombre: empresa.nombre });
  }

  guardarEdicion() {
    if (this.editForm.valid && this.empresaEnEdicion) {
      const nuevoNombre = this.editForm.get('nombre')?.value;
      // this.otherService.updateEmpresa(this.empresaEnEdicion.id_empresa, { nombre: nuevoNombre }).subscribe(
      //   () => {
      //     this.toastr.success('Empresa actualizada exitosamente');
      //     this.loadEmpresas();
      //     this.cancelarEdicion();
      //   },
      //   () => this.toastr.error('Error al actualizar la empresa')
      // );
    }
  }

  cancelarEdicion() {
    this.enEdicion = false;
    this.empresaEnEdicion = null;
    this.editForm.reset();
  }

  cambiarPagina(pagina: number) {
    this.currentPage = pagina;
  }

  get empresasPaginadas() {
    const inicio = (this.currentPage - 1) * this.itemsPerPage;
    const fin = inicio + this.itemsPerPage;
    return this.empresas.slice(inicio, fin);
  }
}
