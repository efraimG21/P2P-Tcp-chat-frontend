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
  userListState: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    protected usersListHandlingService: UsersListHandlingService,
    protected chatHandlingService: ChatHandlingService
  ) {
    usersListHandlingService.unknownUserList$.pipe(takeUntil(this.unsubscribe$)).subscribe(this.unknownUsersList$)
    usersListHandlingService.knownUserList$.pipe(takeUntil(this.unsubscribe$)).subscribe(this.knownUsersList$)
  }

  changeUserListState(state: boolean) {
    this.userListState = state;
  }

  onSelectedUser(userUid: string) {
    if (!this.userListState)
    {
      this.usersListHandlingService.moveUserToKnownList(userUid)
      this.userListState = true
    }
    this.chatHandlingService.selectedUserUid$.next(userUid);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
