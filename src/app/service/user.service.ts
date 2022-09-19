import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';

@Injectable()
export class UserService {
  _url: string = 'assets/data/users.json';
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._url).pipe(share());
  }

  getActiveUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._url).pipe(
      map(users => users.filter(user => !user.isDiscontinued))
    )
  }

  getUserById(id: string | number): Observable<User> {
    return this._http.get<User[]>(this._url).pipe(
      map((users) => users.find((user) => user.id === id)),
      share()
    );
  }

  getUsersByLettersInFirstName(letters: string): Observable<User[]> {
    return this._http
      .get<User[]>(this._url)
      .pipe(
        map((users) =>
          users.filter((user) =>
            user.firstName.toLowerCase().includes(letters.toLowerCase())
          )
        )
      );
  }
}
