import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080'

@Injectable({
    providedIn: 'root'
  })
  
  export class LiveService {

    constructor(private _zone: NgZone) {}

    getEventSource(): EventSource {       
        return new EventSource(BASE_URL + '/extStats');
    }

    getServerSentEvent() {
        return new Observable(observer => {
          const eventSource = this.getEventSource();
  
          eventSource.onmessage = event => {
            this._zone.run(() => {
              observer.next(event);
            });
          };
  
          eventSource.onerror = error => {
            this._zone.run(() => {
              observer.error(error);
            });
          };
        });
      }

  }