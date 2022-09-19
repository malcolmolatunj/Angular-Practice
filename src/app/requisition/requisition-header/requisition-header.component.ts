import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Currency, Office, User } from '../../models';
import { CommonService } from '../../service/common.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-requisition-header',
  templateUrl: './requisition-header.component.html',
  styleUrls: ['./requisition-header.component.css'],
})
export class RequisitionHeaderComponent implements OnInit {
  @Input() formGroupName: string;

  parentForm: FormGroup;
  offices$: Observable<Office[]>;
  users$: Observable<User[]>;
  currencies$: Observable<Currency[]>;
  officeSubscription: Subscription

  constructor(
    private fg: FormGroupDirective,
    private cs: CommonService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.parentForm = this.fg.control;
    this.offices$ = this.cs.getOffices();
    this.users$ = this.userService.getUsers();
    this.currencies$ = this.cs.getCurrencies();

    this.officeSubscription = this.office.valueChanges.subscribe((officeId) => {
      if (officeId !== 1) {
        this.dept.patchValue(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.officeSubscription.unsubscribe();
  }

  get title(): AbstractControl {
    return this.parentForm.get('reqHeaderForm.title');
  }

  get currency(): AbstractControl {
    return this.parentForm.get('reqHeaderForm.currency');
  }

  get requiredDate(): AbstractControl {
    return this.parentForm.get('reqHeaderForm.requiredDate');
  }

  get requestedFor(): AbstractControl {
    return this.parentForm.get('reqHeaderForm.requestedFor');
  }

  get office(): AbstractControl {
    return this.parentForm.get('reqHeaderForm.office');
  }

  get selectionMethod(): AbstractControl {
    return this.parentForm.get('reqHeaderForm.selectionMethod');
  }

  get dept(): AbstractControl {
    return this.parentForm.get('reqHeaderForm.dept');
  }
}
