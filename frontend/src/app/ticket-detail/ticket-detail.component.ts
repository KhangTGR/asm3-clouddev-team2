import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent implements OnInit {
  event: any;
  isModalOpen = false;
  successMessage: string | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.fetchEventDetails(eventId);
  }
  fetchEventDetails(eventId: string | null): void {
    if (eventId) {
      this.apiService.getEventDetails(eventId).subscribe(
        response => {
          this.event = response.event;
        },
        error => {
          console.error('Failed to fetch event details', error);
        }
      )
    }
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmPurchase() {
    if (this.event && this.event.id) {
      this.apiService.buyTicket(this.event.id).subscribe(
        response => {
          console.log('Ticket purchased:', response);
          this.successMessage = 'Ticket purchased successfully!';
          this.closeModal();
        },
        error => {
          console.error('Failed to purchase ticket', error);
        }
      );
    }
  }

}
