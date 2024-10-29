import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiResponse, ErrorApiResponse } from '../../services/http/http.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css']
})
export class RetirosComponent implements OnInit {

  transferForm: FormGroup;
  saldoDisponible = 0; // Ejemplo de saldo disponible

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
    this.cargarSaldoDisponible();
  }

  cargarSaldoDisponible() {
    this.cuentaService.getCuenta().subscribe({
      next: (response: ApiResponse) => {
        const data = response.data;
        this.saldoDisponible = data.saldo;
        this.transferForm.get('monto')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this.saldoDisponible)
        ]);
      },
      error: (error: ErrorApiResponse) => {
        this.toastr.error(error.error, 'Error al cargar el saldo disponible');
      }
    });
  }

  realizarTransferencia() {
    if (this.transferForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, transferir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          const { monto } = this.transferForm.value;

          this.cuentaService.realizarTransferencia({ monto: Number(monto) }).subscribe({
            next: (response: ApiResponse) => {
              this.toastr.success('Transferencia realizada con éxito');
              this.cargarSaldoDisponible();
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
