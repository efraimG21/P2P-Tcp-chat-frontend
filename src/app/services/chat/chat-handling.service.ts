import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ChatInterface} from "../../interfaces/chat-interface";
import {UserHandlingService} from "../user/user-handling.service";

@Injectable({
  providedIn: 'root'
})
export class ChatHandlingService {
  selectedUserUid = new BehaviorSubject<string | null>(null);
  selectedChatUid = new BehaviorSubject<string | null>(null);

  readonly API_URL: string = 'http://0.0.0.0:8080/chat';
  constructor(private http: HttpClient, private userHandlingService: UserHandlingService) {
    this.selectedUserUid.subscribe(value => {
      if (value && userHandlingService.currentUserUid.value) {
        this.getChat(userHandlingService.currentUserUid.value, value)
      }
    })
  }


  getChat(uid1: string, uid2: string): Observable<ChatInterface> {
    return this.http.get<ChatInterface>(
      `${this.API_URL}/get/${uid1}/${uid2}`
    );
  }
}
