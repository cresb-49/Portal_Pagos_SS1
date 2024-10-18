import { Component, OnInit } from '@angular/core';
import { AdminSlidebarComponent } from '../../components/admin-slidebar/admin-slidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, AdminSlidebarComponent, RouterLink, NavbarComponent],
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
