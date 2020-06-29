import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public websocket: WebSocketSubject<any>;
  public connected: boolean;

  constructor(
    private global: GlobalService,
  ) {
    this.connected = false;
    this.websocket = new WebSocketSubject(this.global.websocketServer);
  }
}
