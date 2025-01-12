import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTicketDetailComponent } from './history-ticket-detail.component';

describe('HistoryTicketDetailComponent', () => {
  let component: HistoryTicketDetailComponent;
  let fixture: ComponentFixture<HistoryTicketDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTicketDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
