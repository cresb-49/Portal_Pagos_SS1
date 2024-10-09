import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  selector: 'app-clean-view',
  templateUrl: './clean-view.component.html',
  styleUrls: ['./clean-view.component.css']
})
export class CleanViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
