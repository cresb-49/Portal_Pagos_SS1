import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
@Component({
  standalone: true,
  imports: [LoginComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
