import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserInterface} from "../../interfaces/user-interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersListRequestingService {

  private readonly API_Url: string = 'http://0.0.0.0:8080/user-handling';

  constructor(private http: HttpClient) { }

  getUsersList(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.API_Url}/user-list`)
  }
}
