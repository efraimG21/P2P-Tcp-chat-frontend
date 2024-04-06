import {Component, OnInit} from '@angular/core';
import {UserHandlingService} from "../../services/user/user-handling.service";
import {ActivatedRoute} from "@angular/router";
import {WebSocketHandlingService} from "../../services/web-socket/web-socket-handling.service";

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit {
  constructor(
    userHandlingService: UserHandlingService,
    private activatedRoute: ActivatedRoute,
    private webSocketHandlingService: WebSocketHandlingService
  ) {
    userHandlingService.currentUserUid.next(activatedRoute.snapshot.paramMap.get('uid'));
  }

  ngOnInit() {
  }
}
