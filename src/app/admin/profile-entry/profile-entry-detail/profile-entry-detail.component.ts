import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { EMPTY, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { CommonService } from '../../../service/common.service';
import { Country, Language, Office, User } from '../../../models';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-profile-entry-detail',
  templateUrl: './profile-entry-detail.component.html',
  styleUrls: ['./profile-entry-detail.component.css'],
})
export class ProfileEntryDetailComponent implements OnInit, OnDestroy {
  @Input() formGroupName: string;

  parentForm: FormGroup;
  countries$: Observable<Country[]>;
  languages$: Observable<Language[]>;
  offices$: Observable<Office[]>;
  substitutes$: Observable<User[]>;
  languageSubscription: Subscription;

  constructor(
    private fg: FormGroupDirective,
    private commonService: CommonService,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  ngOnInit() {
    this.parentForm = this.fg.control;
    this.countries$ = this.commonService.getCountries();
    this.languages$ = this.commonService.getLanguages();
    this.substitutes$ = this.userService.getActiveUsers();
    this.languageSubscription = this.language.valueChanges.subscribe(
      (selectedLanguage) => {
        if (selectedLanguage) {
          alert('Language changed');
        }
      }
    );

    this.offices$ = this.country.valueChanges.pipe(
      switchMap((value) =>
        this.commonService
          .getOffices()
          .pipe(
            map((offices) => offices.filter((office) => office.id === value))
          )
      )
    );
  }

  get firstName() {
    return this.parentForm.get('basicDetailForm.firstName');
  }

  get lastName() {
    return this.parentForm.get('basicDetailForm.lastName');
  }

  get email() {
    return this.parentForm.get('basicDetailForm.email');
  }

  get confirmPassword() {
    return this.parentForm.get('basicDetailForm.confirmPassword');
  }

  get password() {
    return this.parentForm.get('basicDetailForm.password');
  }

  get country() {
    return this.parentForm.get('basicDetailForm.country');
  }

  get language() {
    return this.parentForm.get('basicDetailForm.language');
  }

  get isOOF() {
    return this.parentForm.get('basicDetailForm.isOOF');
  }

  get substitute() {
    return this.parentForm.get('basicDetailForm.substituteUser');
  }
}
