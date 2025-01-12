import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownOpen = false;
  constructor(private router: Router, private cookieService: CookieService, private apiService: ApiService) {}
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  logout() {
    this.cookieService.delete('authToken');
    this.router.navigate(['/login']); 
  }
  
}
