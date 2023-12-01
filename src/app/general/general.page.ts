import { Component, OnInit } from '@angular/core';
import { LiveService } from '../services/live.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})

export class GeneralPage implements OnInit {

  constructor(private liveService: LiveService) { }

  isLive: boolean = false;
  timeout!: any;

  ngOnInit() {
    this.startOrRefreshTimeout();
    this.liveService.getServerSentEvent().subscribe((data: any) => {
      if (data) {
        this.isLive = true;
        this.startOrRefreshTimeout();
      }
    });
  }

  startOrRefreshTimeout() {

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Set a 5s timeout
    this.timeout = setTimeout(() => {
      this.isLive = false;
    }, 5000);
  }

  ngOnDestroy() {
    // Ensure that the timeout is cleared when the component is destroyed
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

}
