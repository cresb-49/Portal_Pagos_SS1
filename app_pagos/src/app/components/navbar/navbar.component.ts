import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() emptyNav = false;
  name = '';
  email = '';
  isCliente = false;
  isAdmin = false;

  isLoggedIn = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authStatus$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin();
      this.isCliente = this.authService.isCliente();
      this.name = this.authService.getFullName();
      this.email = this.authService.getEmail();
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }

  userMenuOpen = false;
  navbarOpen = false;

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.userMenuOpen &&
      !this.elementRef.nativeElement.querySelector('#user-dropdown').contains(event.target)
    ) {
      this.userMenuOpen = false;
    }

    if (
      this.navbarOpen &&
      !this.elementRef.nativeElement.querySelector('#navbar-user').contains(event.target) &&
      !this.elementRef.nativeElement.querySelector('.inline-flex').contains(event.target)
    ) {
      this.navbarOpen = false;
    }
  }
}
