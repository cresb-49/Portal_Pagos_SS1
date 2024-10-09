import { Component, OnInit } from '@angular/core';
import { CrearModificarUsuarioComponent } from '../../components/crear-modificar-usuario/crear-modificar-usuario.component';
@Component({
  standalone: true,
  imports: [CrearModificarUsuarioComponent],
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  private crearUsuario = false;
  constructor() { }

  ngOnInit() {
  }

  public getCreaUsuario(): boolean {
    return this.crearUsuario;
  }

}
