import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-info-servicios',
  templateUrl: './info-servicios.component.html',
  styleUrls: ['./info-servicios.component.css']
})
export class InfoServiciosComponent implements OnInit {

  services = [
    {
      title: 'Gateway de Pagos',
      description: 'Es un sistema intermedio que permite la comunicación segura entre portales de venta y entidades financieras, asegurando la transferencia de fondos de manera eficiente.',
    },
    {
      title: 'Zona de Registro',
      description: 'Permitir crear o eliminar cuentas vinculadas a una cuenta bancaria o tarjeta de crédito.',
    },
    {
      title: 'Retiro de Dinero',
      description: 'Permite movilizar efectivo de la cuenta del portal de pagos hacia la cuenta bancaria o la tarjeta de crédito asociada. Se cobrará el 1.3% del monto a retirar por concepto de movilización de fondos.',
    },
    {
      title: 'Reporte de Ingresos/Egresos',
      description: 'Presenta ingresos y egresos realizados en la cuenta del portal de pagos. Para egresos, indica el número de cuenta y la entidad financiera donde se realizó el depósito.',
    },
    {
      title: 'Autorización de Fondos',
      description: 'Depende del tipo de cuenta. Para cuentas bancarias, la autorización ocurre si hay fondos. Para tarjetas de crédito, la autorización será válida si no se sobrepasa el límite de crédito o si la tarjeta no está bloqueada.',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
