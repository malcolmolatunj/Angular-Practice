import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../models';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  @ViewChild('searchbox') searchBoxRef: ElementRef;
  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject('');
  searchTermChange$: Observable<string> = this.searchTermSubject.asObservable();
  columnsToDisplay: string[] = ['firstName', 'lastName', 'email'];

  users$: Observable<User[]> = this.searchTermChange$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((text) => this.userService.getUsersByLettersInFirstName(text))
  );

  constructor(
    private userService: UserService,
  ) {}

  onSearchChanged(): void {
    this.searchTermSubject.next(this.searchBoxRef.nativeElement.value);
  }
}
