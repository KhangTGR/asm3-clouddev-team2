import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomepageComponent implements OnInit {
  events: any[] = [];
  tickets: any[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.fetchEvents();
    this.fetchTickets();
  }
  fetchEvents() {
    this.apiService.getEvents().subscribe(
      response => {
        this.events = response.events;
      },
      error => {
        console.error('Failed to fetch events', error);
      }
    )
  }

  fetchTickets() {
    this.apiService.getTickets().subscribe(
      response => {
        this.tickets = response.tickets;
      },
      error => {
        console.error('Failed to fetch tickets', error);
      }
    )
  }
}
