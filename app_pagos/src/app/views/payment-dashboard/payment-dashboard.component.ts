import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { ApiResponse } from '../../services/http/http.service';

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
  transactions = [
    { date: '2024-10-01', description: 'Pago en Ecommerse', type: 'Debito', amount: -45.00 },
    { date: '2024-10-10', description: 'Ingreso por Transferencia', type: 'Credito', amount: 500.00 },
    { date: '2024-10-15', description: 'Retiro a Banca', type: 'Retiro', amount: -120.00 },
  ];
  constructor(
    private cuentaService: CuentaService,
  ) { }

  ngOnInit() {
    this.cuentaService.getCuenta().subscribe({
      next: (response: ApiResponse) => {
        console.log('response:', response.data);
      },
      error: (error: ApiResponse) => {
        console.log('Error:', error);
      }
    });

    this.cuentaService.getTRansacciones().subscribe({
      next: (response: ApiResponse) => {
        console.log('response:', response.data);
      },
      error: (error: ApiResponse) => {
        console.log('Error:', error);
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
