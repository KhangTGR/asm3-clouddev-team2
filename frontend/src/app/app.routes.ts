import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HistoryTicketDetailComponent } from './history-ticket-detail/history-ticket-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: 'otp-verification', component: OtpVerificationComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
    { path: 'ticket/:id', component: TicketDetailComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'history-ticket/:ticket_id', component: HistoryTicketDetailComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
