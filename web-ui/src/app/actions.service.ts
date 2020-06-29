import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private socket: SocketService,
  ) {}

  action1() {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();
      const messages = this.socket.websocket.subscribe(
        (data) => {
          if (data.id === id) {
            messages.unsubscribe();
            resolve(data);
          }
        },
        (err) => reject(err)
      );
      this.socket.websocket.next({
        action: 'action1',
        data: {
          message: 'Hello World',
          id
        }
      });
    });
  }

  action2() {
    this.socket.websocket.next({
      action: 'action2',
      data: {
        message: 'Hello World'
      }
    });
  }
}
