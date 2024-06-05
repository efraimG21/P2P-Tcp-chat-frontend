import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, retry} from "rxjs";
import {UserInterface} from "../../interfaces/user-interface";
import {HttpClient} from "@angular/common/http";
import {UserHandlingService} from "../user/user-handling.service";
import {UserRequestingService} from "../user/user-requesting.service";
import {UsersListRequestingService} from "./users-list-requesting.service";

@Injectable({
  providedIn: 'root'
})
export class UsersListHandlingService {
  private userList$ = new BehaviorSubject<UserInterface[]>([])
  knownUserList$ = new BehaviorSubject<UserInterface[]>([])
  unknownUserList$ = new BehaviorSubject<UserInterface[]>([])

  constructor(private userHandlingService: UserHandlingService,
              private usersListRequestingService: UsersListRequestingService)
  {
    userHandlingService.currentUserUid.subscribe(currentUserUid => {
      if (currentUserUid) {
        this.usersListRequestingService.getUsersList().pipe().subscribe(value => {
          this.userList$.next(value.filter(user => user._id.toString() !== currentUserUid))
          this.unknownUserList$.next(this.userList$.getValue())
        });
      }
    })

  }

  addUserToList(user: UserInterface) {
    const userList = this.userList$.getValue()
    const unknownUserList = this.unknownUserList$.getValue()
    const knownUserList = this.knownUserList$.getValue()

    const userExists = userList.find(
      value => value._id.toString() === user._id.toString()
    );

    if (userExists) {
      return;
    }
    if (!unknownUserList.includes(user))
    {
      this.userList$.next([...userList, user])
      this.unknownUserList$.next([...unknownUserList, user]);
    }
    else {
      this.knownUserList$.next([...knownUserList, user]);
    }
  }

}
