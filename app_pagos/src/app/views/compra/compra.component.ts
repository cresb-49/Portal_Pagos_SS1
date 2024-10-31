import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse, ErrorApiResponse } from '../../services/http/http.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private toastr: ToastrService
  ) {
    this.transferForm = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {

  }

  realizarTransferencia() {
    if (this.transferForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          const { monto } = this.transferForm.value;

          this.cuentaService.realizarCompra({ monto: Number(monto) }).subscribe({
            next: (response: ApiResponse) => {
              this.toastr.success('Transferencia realizada con éxito');
              this.transferForm.reset();
            },
            error: (error: ErrorApiResponse) => {
              this.toastr.error(error.error, 'Error al realizar la transferencia');
            }
          });
        }
      });
    }
  }
}
