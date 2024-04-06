import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserInterface} from "../../interfaces/user-interface";
import {HttpClient} from "@angular/common/http";
import {UserHandlingService} from "../user/user-handling.service";

@Injectable({
  providedIn: 'root'
})
export class UsersListHandlingService {
  private userList$ = new BehaviorSubject<UserInterface[]>([])
  knownUserList$ = new BehaviorSubject<UserInterface[]>([])
  unknownUserList$ = new BehaviorSubject<UserInterface[]>([])

  private readonly API_Url: string = 'http://0.0.0.0:8080/user-handling';

  constructor(private http: HttpClient, private userHandlingService: UserHandlingService) {
    userHandlingService.currentUserUid.subscribe(currentUserUid => {
      if (currentUserUid) {
        this.getUsersList().pipe().subscribe(value => {
          this.unknownUserList$.next(value.filter(user => user._id.toString() !== currentUserUid))
        });
      }
    })

  }

  private getUsersList(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.API_Url}/user-list`)
  }
}
