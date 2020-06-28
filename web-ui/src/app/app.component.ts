import { Component } from '@angular/core';
import { GlobalService } from './global.service';

import Sockette from 'sockette';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private global: GlobalService,
  ) {
    const socket = new Sockette(this.global.websocketServer);
  }
}
