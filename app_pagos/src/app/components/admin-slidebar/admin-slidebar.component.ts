import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-admin-slidebar',
  templateUrl: './admin-slidebar.component.html',
  styleUrls: ['./admin-slidebar.component.css']
})
export class AdminSlidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
