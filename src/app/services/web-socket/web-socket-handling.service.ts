import {Injectable} from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {UserHandlingService} from "../user/user-handling.service";
import {webSocket} from "rxjs/webSocket";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketHandlingService {
  private readonly API_URL = 'ws://localhost:8080/socket';
  private socket$: WebSocketSubject<any>

  constructor(private userHandlingService: UserHandlingService) {
    const socketURL = `${this.API_URL}/${userHandlingService.currentUserUid.getValue()}`;
    this.socket$ = webSocket(socketURL);
    this.userHandlingService.isActive$.next(true);
  }

  sendMessage(message: string): void {
  }

  getMessage(): Observable<any> {
    return this.socket$.asObservable();
  }

  onClose() {
    this.socket$.complete()
    this.userHandlingService.isActive$.next(false);
  }
}
