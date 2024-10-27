import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css']
})
export class RetirosComponent implements OnInit {

  transferForm: FormGroup;
  saldoDisponible = 1500.75; // Ejemplo de saldo disponible

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private toastr: ToastrService
  ) {
    this.transferForm = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1), Validators.max(this.saldoDisponible)]]
    });
  }

  ngOnInit(): void {
    this.cargarSaldoDisponible();
  }

  cargarSaldoDisponible() {
    // this.cuentaService.getSaldo().subscribe((saldo: number) => {
    //   this.saldoDisponible = saldo;
    //   this.transferForm.controls['monto'].setValidators([Validators.required, Validators.min(1), Validators.max(this.saldoDisponible)]);
    // });
  }

  realizarTransferencia() {
    if (this.transferForm.valid) {
      // const { monto } = this.transferForm.value;
      // this.cuentaService.realizarTransferencia({ monto }).subscribe(
      //   () => this.toastr.success('Transferencia realizada con éxito'),
      //   () => this.toastr.error('Error al realizar la transferencia')
      // );
    }
  }
}
