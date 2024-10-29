import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { ToastrService } from 'ngx-toastr';

export interface PayloadUpdatePassword {
  current_password: string;
  new_password: string;
}

export interface PayloadUserRegister {
  nombres: string;
  email: string;
  password: string;
  apellidos: string;
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

  //Registro de usaurio
  signUpCliente(payload: PayloadUserRegister) {
    return this.httpService.post<any>('signup', payload, true);
  }

  //Obtener informacion personal del usuario
  getProfile() {
    return this.httpService.get<any>('user/my-information', null, true);
  }

  //Actualizacion de las password del usuario
  updatePassword(id_usuario: number, payload: PayloadUpdatePassword) {
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
    return this.httpService.patch<any>(`user/update/cliente/${id}`, data, true);
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
  updateCuenta(id: number, data: any) {
    return this.httpService.patch<any>(`cuenta/${id}`, data, true);
  }
}
