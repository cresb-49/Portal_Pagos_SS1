import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OtherService } from '../../services/other/other.service';
import { ErrorApiResponse } from '../../services/http/http.service';
import { ToastrService } from 'ngx-toastr';

interface ReportOption {
  title: string;
  description: string;
  downloadLink: string;
  requiresDateRange: boolean;
  startDate?: Date;
  endDate?: Date;
  usuario_id_seleccionado?: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(
    private otherService: OtherService,
    private toatsr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  reportOptions: ReportOption[] = [
    {
      title: 'Reporte de Usuarios Inscritos',
      description: 'Reporte de usuarios inscritos al sitio según el estado del usuario.',
      downloadLink: 'reporte1',
      requiresDateRange: false
    },
    {
      title: 'Reporte de Errores de Transacciones',
      description: 'Reporte de errores (transacciones no procesadas).',
      downloadLink: 'reporte2',
      requiresDateRange: false
    },
    {
      title: 'Reporte de Histórico de Movimientos',
      description: 'Reporte de histórico de movimientos para un usuario específico.',
      downloadLink: 'reporte3',
      requiresDateRange: true,
      startDate: new Date(),
      endDate: new Date(),
      usuario_id_seleccionado: 0
    },
    {
      title: 'Reporte de Ingresos/Egresos',
      description: 'Presenta, hasta una fecha determinada, el monto total de ingresos/egresos en todas las cuentas.',
      downloadLink: 'reporte4',
      requiresDateRange: true,
      startDate: new Date(),
      endDate: new Date()
    },
    {
      title: 'Reporte General de Ganancias',
      description: 'Muestra el monto total generado por concepto de movilización de fondos hasta una fecha determinada.',
      downloadLink: 'reporte5',
      requiresDateRange: true,
      startDate: new Date(),
      endDate: new Date()
    }
  ];

  // Método para descargar el reporte, validando las fechas cuando se requieren
  downloadReport(report: ReportOption) {
    if (report.requiresDateRange && (!report.startDate || !report.endDate)) {
      this.toatsr.error('Por favor, selecciona ambas fechas para este reporte.','Error al obtener el reporte');
      return;
    }
    if (report.requiresDateRange) {
      const startDate = report.startDate?.toISOString().split('T')[0];
      const endDate = report.endDate?.toISOString().split('T')[0];
      if (!(startDate && endDate)) {
        this.toatsr.error('Por favor, selecciona ambas fechas para este reporte.','Error al obtener el reporte');
        return;
      }
    }

    switch (report.downloadLink) {
      case 'reporte1':
        this.otherService.getReport1().subscribe({
          next: (data: Blob | any) => {
            console.log("Response", data);

          },
          error: (error: ErrorApiResponse) => {
            this.toatsr.error(error.error,"Error al obtener el reporte");
          }
        });
        break;
      case 'reporte2':
        this.otherService.getReport2().subscribe({
          next: (data: Blob | any) => {
            console.log("Response", data);

          },
          error: (error: ErrorApiResponse) => {
            this.toatsr.error(error.error,"Error al obtener el reporte");
          }
        });
        break;
      case 'reporte3':
        const startDate3 = report.startDate?.toISOString().split('T')[0];
        const endDate3 = report.endDate?.toISOString().split('T')[0];
        const payload = {
          usuario_id: report.usuario_id_seleccionado,
          start_date: startDate3,
          end_date: endDate3
        };
        this.otherService.getReport3(payload).subscribe({
          next: (data: Blob | any) => {
            console.log("Response", data);

          },
          error: (error: ErrorApiResponse) => {
            this.toatsr.error(error.error,"Error al obtener el reporte");
          }
        });
        break;
      case 'reporte4':
        const startDate4 = report.startDate?.toISOString().split('T')[0];
        const endDate4 = report.endDate?.toISOString().split('T')[0];
        const payload4 = {
          start_date: startDate4,
          end_date: endDate4
        }
        this.otherService.getReport4(payload4).subscribe({
          next: (data: Blob | any) => {
            console.log("Response", data);

          },
          error: (error: ErrorApiResponse) => {
            this.toatsr.error(error.error,"Error al obtener el reporte");
          }
        });
        break;
      case 'reporte5':
        const startDate5 = report.startDate?.toISOString().split('T')[0];
        const endDate5 = report.endDate?.toISOString().split('T')[0];
        const payload5 = {
          start_date: startDate5,
          end_date: endDate5
        }
        this.otherService.getReport5(payload5).subscribe({
          next: (data: Blob | any) => {
            console.log("Response", data);
          },
          error: (error: ErrorApiResponse) => {
            this.toatsr.error(error.error,"Error al obtener el reporte");
          }
        });
        break;
    }
  }
}
