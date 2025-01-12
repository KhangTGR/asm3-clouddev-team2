import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  errorWarning: string | null = null;
  showModal = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[^A-Za-z0-9]/)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.apiService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          console.error('Registration failed', error);
          if (error.status === 400) {
            this.errorWarning = 'Registration failed, please try again!'; // Set the custom error message
          } else {
            this.errorWarning = 'An unknown error occurred. Please try again later.';
          }
        }
      )
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
      // Handle form errors
      console.log('Form is invalid');
    }
  }
}
