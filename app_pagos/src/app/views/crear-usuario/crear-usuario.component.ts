import { Component, OnInit } from '@angular/core';
import { CrearModificarUsuarioComponent } from '../../components/crear-modificar-usuario/crear-modificar-usuario.component';
@Component({
  standalone: true,
  imports: [CrearModificarUsuarioComponent],
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  private crearUsuario = true;

  constructor() { }

  ngOnInit() {
  }

  public getCreaUsuario(): boolean {
    return this.crearUsuario;
  }
}
