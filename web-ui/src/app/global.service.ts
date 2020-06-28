import { Injectable } from '@angular/core';
import { WEBSOCKET_SERVER } from 'config';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  websocketServer = WEBSOCKET_SERVER;

  constructor() { }
}
