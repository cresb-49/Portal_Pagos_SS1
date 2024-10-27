import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaService, TipoTransaccionType, Transaccion } from '../../services/cuenta/cuenta.service';
import { ApiResponse } from '../../services/http/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.css']
})
export class PaymentDashboardComponent implements OnInit {
  currentBalance: number = 1500.75;
  currentPage: number = 1;
  itemsPerPage: number = 2; // Número de transacciones por página
  totalPages: number = 1;
  cuenta: any;
  transactions: Transaccion[] = [
    {
      id_transaccion: 1,
      id_tipo_transaccion: 1,
      id_cuenta_origen: 1,
      id_cuenta_destino: 2,
      id_estado_transaccion: 1,
      monto: -250,
      descripcion: "Pago de Servicio de Luz",
      create_at: "2024-10-27T10:17:53.562Z",
      update_at: "2024-10-27T10:17:53.562Z",
      delete_at: null
    },
    {
      id_transaccion: 2,
      id_tipo_transaccion: 2,
      id_cuenta_origen: 1,
      id_cuenta_destino: 3,
      id_estado_transaccion: 2,
      monto: 500,
      descripcion: "Depósito en cuenta",
      create_at: "2024-10-27T11:25:30.124Z",
      update_at: "2024-10-27T11:25:30.124Z",
      delete_at: null
    },
    {
      id_transaccion: 3,
      id_tipo_transaccion: 1,
      id_cuenta_origen: 2,
      id_cuenta_destino: 1,
      id_estado_transaccion: 3,
      monto: -100,
      descripcion: "Pago de Internet",
      create_at: "2024-10-26T14:45:10.987Z",
      update_at: "2024-10-26T14:45:10.987Z",
      delete_at: null
    },
    {
      id_transaccion: 4,
      id_tipo_transaccion: 3,
      id_cuenta_origen: 1,
      id_cuenta_destino: 4,
      id_estado_transaccion: 1,
      monto: -350.75,
      descripcion: "Pago de alquiler",
      create_at: "2024-10-25T09:12:00.523Z",
      update_at: "2024-10-25T09:12:00.523Z",
      delete_at: null
    },
    {
      id_transaccion: 5,
      id_tipo_transaccion: 2,
      id_cuenta_origen: 3,
      id_cuenta_destino: 1,
      id_estado_transaccion: 2,
      monto: 1500,
      descripcion: "Transferencia recibida",
      create_at: "2024-10-24T17:30:25.912Z",
      update_at: "2024-10-24T17:30:25.912Z",
      delete_at: null
    }
  ];

  displayedTransactions: Transaccion[] = [];

  constructor(
    private cuentaService: CuentaService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getCuenta();
    this.getTransactions();
    this.updatePagination();
  }

  getCuenta() {
    this.cuentaService.getCuenta().subscribe({
      next: (response: ApiResponse) => {
        console.log('response:', response.data);
        this.cuenta = response.data;
      },
      error: (error: ApiResponse) => {
        this.toastr.error(error.error, 'Error');
      }
    });
  }

  getEquivalenteTipoTransaccion(id: number) {
    return TipoTransaccionType.get(id);
  }

  formatFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
  }

  getTransactions() {
    this.cuentaService.getTransacciones().subscribe({
      next: (response: ApiResponse) => {
        this.transactions = response.data;
        this.updatePagination();
      },
      error: (error: ApiResponse) => {
        this.toastr.error(error.error, 'Error');
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
    this.setDisplayedTransactions();
  }

  setDisplayedTransactions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedTransactions = this.transactions.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setDisplayedTransactions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setDisplayedTransactions();
    }
  }
}
