import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserHandlingService} from "../../services/user/user-handling.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebSocketHandlingService} from "../../services/web-socket/web-socket-handling.service";
import {Subject, takeUntil} from "rxjs";
import {UserInterface} from "../../interfaces/user-interface";
import {UsersListHandlingService} from "../../services/users-list/users-list-handling.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();


  constructor(
    public userHandlingService: UserHandlingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private webSocketHandlingService: WebSocketHandlingService,
    private usersListHandlingService: UsersListHandlingService
  ) {

    userHandlingService.currentUserUid.next(activatedRoute.snapshot.paramMap.get('uid'));
    this.webSocketHandlingService.startSocket()
  }

  ngOnInit() {
    this.webSocketHandlingService.getMessage().pipe(takeUntil(this.destroy$)).subscribe({
      next: frame => {
        console.log(frame)
        if (frame.typeOf === 'userLogIn')
        {
          console.log(frame.content as UserInterface)
          this.usersListHandlingService.addUserToList(frame.content as UserInterface)
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this.webSocketHandlingService.onClose()
  }
}
