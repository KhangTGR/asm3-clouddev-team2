import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  
  user: any = {};
  isEditing = false;
  errorWarning: string | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  fetchUserProfile() {
    this.apiService.getUserProfile().subscribe(
      response => {
        this.user = response;
      },
      error => {
        console.error('Failed to fetch user profile', error);
        this.errorWarning = 'Failed to fetch user profile. Please try again later.';
      }
    )
  }
  saveProfile() {
    this.isEditing = false;
  }
}
