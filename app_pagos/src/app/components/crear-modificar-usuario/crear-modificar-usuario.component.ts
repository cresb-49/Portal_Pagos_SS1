import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  selector: 'app-crear-modificar-usuario',
  templateUrl: './crear-modificar-usuario.component.html',
  styleUrls: ['./crear-modificar-usuario.component.css']
})
export class CrearModificarUsuarioComponent implements OnInit {

  //Cuando es true, se muestra el formulario para crear un usuario
  //Cuando es false, se muestra el formulario para modificar un usuario
  @Input() crearUsuario: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
