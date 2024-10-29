import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';


//Una constante map para los tipos de transacciones
// CREDITO = 1,
// DEBITO = 2,
// RETIRO = 3

export const TipoTransaccionType: Map<number, string> = new Map([
  [1, 'Credito'],
  [2, 'Debito'],
  [3, 'Retiro']
]);

export interface Transaccion {
  id_transaccion: number;
  id_tipo_transaccion: number;
  id_cuenta_origen: number;
  id_cuenta_destino: number;
  id_estado_transaccion: number;
  monto: number;
  descripcion: string;
  create_at: string; // ISO date string format
  update_at: string; // ISO date string format
  delete_at: string | null; // Puede ser `null` si está eliminado
}


@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private router: Router, private httpService: HttpService, private toastr: ToastrService) { }

  //Metodo para obtener la cuenta
  getCuenta() {
    return this.httpService.get<any>('cuenta/cliente', null, true);
  }

  getTRansacciones() {
    return this.httpService.get<any>('transacciones/usuario', null, true);
  }

  //Metodo para realizar una transferencia
  realizarTransferencia(data: any) {
    return this.httpService.post<any>('transferencia', data, true);
  }

}
