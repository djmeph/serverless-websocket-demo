import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionsService } from '../actions.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  progress: number;
  going: boolean;
  finishing: boolean;
  stage: string;
  messages: any;


  constructor(
    private actions: ActionsService,
    private socket: SocketService,
  ) {
    this.progress = 0;
    this.going = false;
    this.stage = 'go';
  }

  ngOnInit() {
    this.messages = this.socket.websocket.subscribe(
      (data) => {
        if (data.value) {
          this.progress = data.value;
          if (data.value === 100) {
            this.finishing = false;
            this.stage = 'finish';
          }
        }
      },
      (err) => console.error(err)
    );
  }

  ngOnDestroy() {
    this.messages.unsubscribe();
  }

  async go() {
    this.going = true;
    const result: any = await this.actions.action1();
    this.progress = result.value;
    this.going = false;
    this.stage = 'next';
  }

  next() {
    this.finishing = true;
    this.actions.action2();
  }

  finish() {
    this.progress = 0;
    this.stage = 'go';
  }

}
