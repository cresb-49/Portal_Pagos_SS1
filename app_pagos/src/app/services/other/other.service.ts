import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private router: Router, private httpService: HttpService, private toastr: ToastrService) { }


}
