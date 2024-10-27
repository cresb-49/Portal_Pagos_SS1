import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';

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

}
