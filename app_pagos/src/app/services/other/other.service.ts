import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { ToastrService } from 'ngx-toastr';

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
}
