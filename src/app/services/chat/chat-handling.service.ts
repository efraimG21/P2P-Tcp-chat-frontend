import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserHandlingService} from "../user/user-handling.service";
import {ChatRequestingService} from "./chat-requesting.service";
import {MessageInterface} from "../../interfaces/message-interface";

@Injectable({
  providedIn: 'root'
})
export class ChatHandlingService {
  selectedUserUid$ = new BehaviorSubject<string | null>(null);
  selectedChatUid$ = new BehaviorSubject<string | null>(null);
  messages$ = new BehaviorSubject<MessageInterface[]>([]);


  constructor(
    private chatRequestingService: ChatRequestingService, private userHandlingService: UserHandlingService) {
    this.selectedUserUid$.subscribe(value => {
      if (this.userHandlingService.currentUserUid.value && value) {
        this.getChat(this.userHandlingService.currentUserUid.value, value);
      }
    })
  }

  private getChat(currUserUid: string, otherUserUid: string) {
    this.chatRequestingService.getChat(currUserUid, otherUserUid)
      .subscribe(value => {
        this.selectedChatUid$.next(value._id);
        this.messages$.next(value.messages);
      })
  }


}
