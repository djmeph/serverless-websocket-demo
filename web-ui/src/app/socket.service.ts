import { Injectable } from '@angular/core';
import Sockette from 'sockette';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  connected: boolean;

  constructor(
    private global: GlobalService,
  ) {
    this.connected = false;
    this.socket = new Sockette(this.global.websocketServer, {
      timeout: 5e3,
      maxAttempts: 1,
      onopen: e => this.onopen(e),
      onmessage: e => this.onmessage(e),
      onreconnect: e => this.onreconnect(e),
      onmaximum: e => this.onmaximum(e),
      onclose: e => this.onclose(e),
      onerror: e => this.onerror(e),
    });
  }

  onopen(e: Event) {
    this.connected = true;
    console.log('connected:', e);
  }

  onmessage(e: Event) {
    console.log('Message Received:', e);
  }

  onreconnect(e: Event) {
    this.connected = false;
    console.log('Reconnecting...', e);
  }

  onmaximum(e: Event) {
    this.connected = false;
    console.log('Stop Attempting!', e);
  }

  onclose(e: Event) {
    this.connected = false;
    console.log('Closed!', e);
  }

  onerror(e: Event) {
    this.connected = false;
    console.log('Error:', e);
  }
}
