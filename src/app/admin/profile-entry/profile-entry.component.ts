import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, expand, first, map, takeWhile, tap } from 'rxjs/operators';
import { blankAfterTrim, confirmEqual } from '../../custom-validators';
import { User } from '../../models';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile-entry',
  templateUrl: './profile-entry.component.html',
  styleUrls: ['./profile-entry.component.css'],
})
export class ProfileEntryComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  subscriptions: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        basicDetailForm: this.fb.group({
          firstName: [
            null,
            [Validators.required, Validators.maxLength(50), blankAfterTrim],
          ],
          lastName: [
            null,
            [Validators.required, Validators.maxLength(50), blankAfterTrim],
          ],
          title: [
            null,
            [Validators.required, Validators.maxLength(256), blankAfterTrim],
          ],
          email: [
            null,
            [Validators.required, Validators.email],
            this.userExists.bind(this),
          ],
          username: [{ value: null, disabled: true }],
          password: [
            null,
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(20),
              Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$'),
            ],
          ],
          confirmPassword: [null, Validators.required],
          phoneNumber: [null, Validators.minLength(8)],
          country: [null, Validators.required],
          language: [null, Validators.required],
          countryOffice: [null, Validators.required],
          isGlobalUser: [false, { updateOn: 'change' }],
          substituteUser: [null, [], this.circularReference.bind(this)],
          isOOF: [false, { updateOn: 'change' }],
        }),
        roles: this.fb.array([]),
      },
      {
        validators: confirmEqual(
          'basicDetailForm.password',
          'basicDetailForm.confirmPassword'
        ),
        updateOn: 'blur',
      }
    );

    this.subscriptions = this.userForm
      .get('basicDetailForm.email')
      .valueChanges.subscribe((newValue) => {
        this.userForm.patchValue({
          basicDetailForm: {
            username: newValue,
          },
        });
      });

    this.subscriptions.add(
      this.userForm
        .get('basicDetailForm.isOOF')
        .valueChanges.subscribe((isOOF) => {
          const subUserControl = this.userForm.get(
            'basicDetailForm.substituteUser'
          );
          if (isOOF) {
            subUserControl.addValidators(Validators.required);
          } else {
            subUserControl.removeValidators(Validators.required);
          }
          subUserControl.updateValueAndValidity();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSave(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }

  onReset(): void {
    this.userForm.reset({
      basicDetailForm: {
        isGlobalUser: false,
        isOOF: false,
      },
    });
    const roles = this.userForm.get('roles') as FormArray;
    roles.clear();
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }

  userExists(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.getUsers().pipe(
      first(),
      map((users) =>
        users.some(
          (user) => user.email.toLowerCase() === ctrl.value.toLowerCase()
        )
      ),
      map((userExists) => (userExists ? { nameTaken: true } : null))
    );
  }

  circularReference(
    ctrl: AbstractControl
  ): Observable<ValidationErrors | null> {
    const user$: Observable<User> = this.userService.getUserById(ctrl.value);

    return user$.pipe(
      expand((user) => this.userService.getUserById(user.substituteUserId)),
      takeWhile((user) => !!user.substituteUserId),
      tap((user) => console.log(user)),
      map((user) => (!!user.substituteUserId ? { circular: true } : null)),
      catchError(() => EMPTY)
    );
  }
}
