import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../../components/signup/signup.component';


@Component({
  standalone: true,
  imports: [SignupComponent],
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  private regitrarEmpresa: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  public getRegistrarEmpresa(): boolean {
    return this.regitrarEmpresa;
  }

}
