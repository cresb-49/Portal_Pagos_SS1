import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ReportOption {
  title: string;
  description: string;
  downloadLink: string;
  requiresDateRange: boolean;
  startDate?: Date;
  endDate?: Date;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  reportOptions: ReportOption[] = [
    {
      title: 'Reporte de Usuarios Inscritos',
      description: 'Reporte de usuarios inscritos al sitio según el estado del usuario.',
      downloadLink: '/api/reports/usuarios-inscritos',
      requiresDateRange: false
    },
    {
      title: 'Reporte de Errores de Transacciones',
      description: 'Reporte de errores (transacciones no procesadas).',
      downloadLink: '/api/reports/errores-transacciones',
      requiresDateRange: false
    },
    {
      title: 'Reporte de Histórico de Movimientos',
      description: 'Reporte de histórico de movimientos para un usuario específico.',
      downloadLink: '/api/reports/historico-movimientos',
      requiresDateRange: true
    },
    {
      title: 'Reporte de Ingresos/Egresos',
      description: 'Presenta, hasta una fecha determinada, el monto total de ingresos/egresos en todas las cuentas.',
      downloadLink: '/api/reports/ingresos-egresos',
      requiresDateRange: true
    },
    {
      title: 'Reporte General de Ganancias',
      description: 'Muestra el monto total generado por concepto de movilización de fondos hasta una fecha determinada.',
      downloadLink: '/api/reports/ganancias-generales',
      requiresDateRange: true
    }
  ];

  // Método para descargar el reporte, validando las fechas cuando se requieren
  downloadReport(report: ReportOption) {
    if (report.requiresDateRange && (!report.startDate || !report.endDate)) {
      alert('Por favor, selecciona ambas fechas para este reporte.');
      return;
    }

    let downloadUrl = report.downloadLink;
    if (report.requiresDateRange) {
      const startDate = report.startDate?.toISOString().split('T')[0];
      const endDate = report.endDate?.toISOString().split('T')[0];
      downloadUrl += `?startDate=${startDate}&endDate=${endDate}`;
    }
    window.open(downloadUrl, '_blank');
  }
}
