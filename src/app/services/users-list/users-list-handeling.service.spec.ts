import {TestBed} from '@angular/core/testing';

import {UsersListHandlingService} from './users-list-handling.service';

describe('UsersListHandelingService', () => {
  let service: UsersListHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
