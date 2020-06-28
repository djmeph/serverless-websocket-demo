import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  progress: number;
  going: boolean;

  constructor(
    public socket: SocketService,
  ) {
    this.progress = 0;
    this.going = false;
  }

  ngOnInit() {
  }

  go() {
    this.socket.socket.json({
      action: 'rpc',
      data: 'Hello World'
    });
  }

}
