import {Component} from '@angular/core';
import {UserHandlingService} from "./services/user/user-handling.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-P2P-Tcp-Chat';

  constructor(public userHandlingService: UserHandlingService) {
  }
}
