import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserHandlingService {

  currentUserUid = new BehaviorSubject<string | null>(null);

  private readonly API_Url: string = 'http://0.0.0.0:8080/user-handling';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router,) {
    this.currentUserUid.subscribe(value => {
      if (value) {
        this.doseUserExists().subscribe(value => {
          if (!value) {
            this.router.navigate(['/']).then();
          }
        })
      }
    })
  }

  doseUserExists(): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_Url}/is-exists/${this.currentUserUid.getValue()}`)
  }
}
