import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from '../../components/signup/signup.component';
@Component({
  standalone: true,
  imports: [RouterOutlet, SignupComponent],
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
