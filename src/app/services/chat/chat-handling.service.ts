import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatHandlingService {
  selectedUserUid = new BehaviorSubject<string | null>(null);
  selectedChatUid = new BehaviorSubject<string | null>(null);

  constructor() {
    this.selectedUserUid.subscribe(value => {
      if (value) {
      }
    })
  }
}
