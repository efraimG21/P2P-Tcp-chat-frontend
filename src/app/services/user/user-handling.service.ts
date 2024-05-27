import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserRequestingService} from "./user-requesting.service";

@Injectable({
  providedIn: 'root'
})
export class UserHandlingService {
  isActive$ = new BehaviorSubject<boolean>(false);
  currentUserUid = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private userRequestingService: UserRequestingService)
  {
    this.currentUserUid.subscribe(value => {
      if (value) {
        this.isUserExists(value);
      }
    })
  }

  isUserExists(uid: string){
    this.userRequestingService.doseUserExists(uid).subscribe(value => {
      if (!value) {
        this.router.navigate(['/']).then();
      }
    })
  }
}
