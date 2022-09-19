import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';

@Injectable()
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  user$: Observable<User>;
  constructor() {
    this.userSubject = new BehaviorSubject({
      id: 1,
      email: 'molatunji@pedaids.org',
      firstName: 'malcolm',
      lastName: 'olatunji',
      title: 'Mr.',
      countryId: 5,
      languageCode: 'pt',
      pageSize: 5,
      isDiscontinued: false
    });
    this.user$ = this.userSubject.asObservable();
  }

  update(value: User): void {
    this.userSubject.next(value);
  }
}
