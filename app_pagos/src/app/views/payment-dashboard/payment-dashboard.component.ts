import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.css']
})
export class PaymentDashboardComponent implements OnInit {
  currentBalance: number = 1500.75;
  transactions = [
    { date: '2024-10-01', description: 'Pago en Supermercado', amount: -45.00 },
    { date: '2024-10-10', description: 'Ingreso por Transferencia', amount: 500.00 },
    { date: '2024-10-15', description: 'Compra de Electrónica', amount: -120.00 },
  ];
  constructor() { }

  ngOnInit() {
  }

}
