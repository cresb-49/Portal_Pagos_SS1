import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaService } from '../../services/cuenta/cuenta.service';
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
  totalPages: number = 1;
  cuenta: any;
  transactions = [
    { date: '2024-10-01', description: 'Pago en Ecommerse', type: 'Debito', amount: -45.00 },
    { date: '2024-10-10', description: 'Ingreso por Transferencia', type: 'Credito', amount: 500.00 },
    { date: '2024-10-15', description: 'Retiro a Banca', type: 'Retiro', amount: -120.00 },
  ];
  constructor(
    private cuentaService: CuentaService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getCuenta();
    this.getTransactions();
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

  getTransactions() {
    this.cuentaService.getTRansacciones().subscribe({
      next: (response: ApiResponse) => {
        console.log('response:', response.data);
        this.transactions = response.data;
      },
      error: (error: ApiResponse) => {
        this.toastr.error(error.error, 'Error');
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Retroceder página
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
