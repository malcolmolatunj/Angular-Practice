import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Contract, Currency, Language, Office, User } from '../../models';
import { CommonService } from '../../service/common.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-contract-header',
  templateUrl: './contract-header.component.html',
  styleUrls: ['./contract-header.component.css'],
})
export class ContractHeaderComponent implements OnInit {
  @Input() formGroupName: string;

  parentForm: FormGroup;
  offices$: Observable<Office[]>;
  users$: Observable<User[]>;
  currencies$: Observable<Currency[]>;
  languages$: Observable<Language[]>;
  collaborators: FormArray;

  readonly separatorKeyCodes = [ENTER, COMMA] as const;

  constructor(
    private fgd: FormGroupDirective,
    private commonService: CommonService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.parentForm = this.fgd.control;
    this.offices$ = this.commonService.getOffices();
    this.users$ = this.userService.getUsers();
    this.currencies$ = this.commonService.getCurrencies();
    this.languages$ = this.commonService.getLanguages();
    this.collaborators = this.parentForm.get('header.collaborators') as FormArray
  }

  addCollaborator(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.collaborators.push(new FormControl(value));
      event.chipInput!.clear();
    }
  }

  remove(collab) {
    const idx = this.collaborators.controls.indexOf(collab);

    if (idx) {
      this.collaborators.removeAt(idx);
    }
  }
}
