import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserHandlingService} from "./user-handling.service";

@Injectable({
  providedIn: 'root'
})
export class UserRequestingService {
  private readonly API_Url: string = 'http://0.0.0.0:8080/user-handling';

  constructor(private http: HttpClient, private userHandlingService: UserHandlingService) { }

  doseUserExists(): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.API_Url}/is-exists/${this.userHandlingService.currentUserUid.getValue()}`
    )
  }
}
