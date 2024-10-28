import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { ToastrService } from 'ngx-toastr';

export interface payloadUpdatePassword {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private router: Router, private httpService: HttpService, private toastr: ToastrService) { }

  getEmpresas() {
    return this.httpService.get<any>('empresa/empresas', null, true);
  }

  deleteEmpresa(id: number) {
    return this.httpService.delete<any>(`empresa/${id}`, true);
  }

  updateEmpresa(id: number, data: any) {
    return this.httpService.patch<any>(`empresa/${id}`, data, true);
  }

  createEmpresa(data: any) {
    return this.httpService.post<any>('empresa', data, true);
  }

  //Actualizacion de las password del usuario
  updatePassword(id_usuario: number, payload: payloadUpdatePassword) {
    return this.httpService.post<any>(`user/update/password/cliente/${id_usuario}`, payload, true);
  }

  //Acciones con los usuarios tipo cliente
  getClientes() {
    return this.httpService.get<any>('user/clientes', null, true);
  }
  createCliente(data: any) {
    return this.httpService.post<any>('user/create/cliente', data, true);
  }
  updateCliente(id: number, data: any) {
    return this.httpService.patch<any>(`user/delete/cliente/${id}`, data, true);
  }
  deleteCliente(id: number) {
    return this.httpService.delete<any>(`user/delete/cliente/${id}`, true);
  }

  //Acciones referentes al manejo de los administradores
  getAdmins() {
    return this.httpService.get<any>('user/admins', null, true);
  }
  createAdmin(data: any) {
    return this.httpService.post<any>('user/create/admin', data, true);
  }
  updateAdmin(id: number, data: any) {
    return this.httpService.patch<any>(`user/update/admin/${id}`, data, true);
  }
  deleteAdmin(id: number) {
    return this.httpService.delete<any>(`user/delete/admin/${id}`, true);
  }

  //Acciones referentes al manejo de las cuentas
}
