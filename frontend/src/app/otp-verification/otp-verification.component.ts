import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent implements OnInit {
  otpForm: FormGroup;
  errorWarning: string | null = null;
  showModal = false;
  otpValue: string = '';
  email: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.otpForm.get('otp')?.valueChanges.subscribe(value => {
      this.otpValue = value;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      console.log('Input OTP:', this.otpValue); // Log the OTP value

      const data = { email: this.email, otp: this.otpForm.value.otp };
      this.apiService.verifyOtp(data).subscribe(
        response => {
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.router.navigate(['/homepage']);
          }, 2000); // Wait for 2 seconds before redirecting
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorWarning = 'Invalid or expired OTP code';
          } else {
            this.errorWarning = 'Verification failed. Please try again later.';
          }
        }
      );
    } else {
      this.otpForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }

}
