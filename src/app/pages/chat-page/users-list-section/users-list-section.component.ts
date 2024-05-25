import {Component, OnDestroy} from '@angular/core';
import {UsersListHandlingService} from "../../../services/users-list/users-list-handling.service";
import {UserInterface} from "../../../interfaces/user-interface";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {ChatHandlingService} from "../../../services/chat/chat-handling.service";

@Component({
  selector: 'app-users-list-section',
  templateUrl: './users-list-section.component.html',
  styleUrl: './users-list-section.component.scss'
})
export class UsersListSectionComponent implements OnDestroy {
  knownUsersList$ = new BehaviorSubject<UserInterface[]>([]);
  unknownUsersList$ = new BehaviorSubject<UserInterface[]>([]);
  private unsubscribe$ = new Subject<void>();
  userListState: boolean = false;

  constructor(
    public usersListHandlingService: UsersListHandlingService,
    public chatHandlingService: ChatHandlingService
  ) {
    usersListHandlingService.knownUserList$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.knownUsersList$.next(value))
    usersListHandlingService.unknownUserList$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        console.log(value);
        this.unknownUsersList$.next(value)
      })
  }

  changeUserListState(state: boolean) {
    this.userListState = state;
  }

  onSelectedUser(userUid: string) {
    this.chatHandlingService.selectedUserUid$.next(userUid);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
