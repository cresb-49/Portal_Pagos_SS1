import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from '../../components/table/table.component';
@Component({
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
