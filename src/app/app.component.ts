import { Component, OnInit } from '@angular/core';
import { NotifyService } from './shared/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages = [];

  constructor(private notifyService: NotifyService) {}

  ngOnInit(): void {
    // Refresh current product list with basket state
    this.notifyService.message$.subscribe(msg => {
      this.messages.push(msg);
      setTimeout(() => {
        this.messages.shift();
      }, 5000);
    });
  }
}
