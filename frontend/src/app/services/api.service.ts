import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import {jwtDecode} from "jwt-decode"

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = environment.apiUrl;
    public email: string | null = null;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    registerUser(data: { email: string, username: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register`, data)
          .pipe(
            catchError(this.handleError)
          );
      }

      loginUser(data: {email: string, password: string}): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, data, {observe: 'response'})
            .pipe(
                tap(response => {
                    console.log('Login response:', response); // Log the response
                  }),
            )
      }

      verifyOtp(data: { email: string, otp: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/verify`, data, { observe: 'response' })
          .pipe(
            tap((response: any) => {
              console.log('Verify OTP response:', response); 
              const token = response.body?.token;
              if (token) {
                this.cookieService.set('authToken', token); 
                const decodedToken: any = jwtDecode(token);
                this.email = decodedToken.email;
              }
            }),
            catchError(this.handleError)
          );
      }
    
      
      getUserProfile(): Observable<any> {
        const authToken = this.cookieService.get('authToken');
        return this.http.get(`${this.apiUrl}/profile`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            },
            withCredentials: true
          });
      }

      getEvents(): Observable<any> {
        const authToken = this.cookieService.get('authToken');
        return this.http.get(`${this.apiUrl}/event`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }).pipe(
          tap(response => {
            console.log('Events response:', response); // Log the response
          }),
          catchError(this.handleError)
        );
      }

      getEventDetails(eventId: string): Observable<any> {
        const authToken = this.cookieService.get('authToken');
        return this.http.get<{ event: any }>(`${this.apiUrl}/event/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
            .pipe(
                catchError(this.handleError)
            );
      }

      buyTicket(eventId: string): Observable<any> {
        const authToken = this.cookieService.get('authToken');
        return this.http.post(`${this.apiUrl}/ticket/create`, {event_id: eventId}, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
            .pipe(
                catchError(this.handleError)
            );
      }


      getTickets(): Observable<any> {
        const authToken = this.cookieService.get('authToken');
        return this.http.get(`${this.apiUrl}/ticket`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }).pipe(
          tap(response => {
            console.log('Events response:', response); // Log the response
          }),
          catchError(this.handleError)
        );
      }

      getTicketDetails(ticketId: string): Observable<any> {
        const authToken = this.cookieService.get('authToken');
        return this.http.get<{ ticket: any }>(`${this.apiUrl}/ticket/${ticketId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
            .pipe(
                catchError(this.handleError)
            );
      }

      generateQrCode(eventId: string): Observable<any> {
        const authToken = this.cookieService.get('authToken');
        const body = {event_id: eventId}
        return this.http.post(`${this.apiUrl}/ticket/generate-qr-code`, body, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }) 
        .pipe(
          catchError(this.handleError)
        )
      }
      

      private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
    
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            switch (error.status) {
                case 400:
                    errorMessage = 'Username or Password incorrect';
                    break;
                case 401:
                    errorMessage = 'Unauthorized access';
                    break;
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 500:
                    errorMessage = 'Internal server error';
                    break;
                default:
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
        }
    
        console.error('API Error:', errorMessage);
        return throwError(() => new Error(errorMessage)); // Throw an Error instance with the custom message
    }
    
}