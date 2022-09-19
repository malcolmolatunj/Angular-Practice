import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, switchMap, startWith } from 'rxjs/operators';
import { Contract, Country, User } from '../../models';
import { AuthService } from '../../service/auth.service';
import { CommonService } from '../../service/common.service';
import { UserService } from '../../service/user.service';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-all-contracts-list',
  templateUrl: './all-contracts-list.component.html',
  styleUrls: ['./all-contracts-list.component.css'],
})
export class AllContractsListComponent implements OnInit {
  contracts$: Observable<Contract[]>;
  user$: Observable<User>;
  countries$: Observable<Country[]>;
  managers$: Observable<User[]>;

  searchForm: FormGroup;

  unChangedColumns = [
    'title',
    'vendor',
    'type',
    'statusDescription',
  ];

  columnsToDisplay = [
    'contractNumber',
    'title',
    'vendor',
    'type',
    'createdDate',
    'startDate',
    'endDate',
    'amountUSD',
    'amount',
    'managerName',
    'officeName',
    'statusDescription',
  ];

  columnNameMap: { [key: string]: string } = {
    title: 'Title',
    vendor: 'Vendor',
    type: 'Contract Type',
    managerName: 'Contract Manager',
    officeName: 'Procuring for Office Location',
    statusDescription: 'Contract Status',
  };

  constructor(
    private contractService: ContractService,
    private auth: AuthService,
    private common: CommonService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.user$;
    this.countries$ = this.common.getCountries();
    this.managers$ = this.userService.getUsers();
    this.searchForm = this.fb.group({
      status: [1],
      dept: [],
      project: [],
      manager: [],
      country: []
    })

    this.contracts$ = this.searchForm.valueChanges.pipe(
      startWith([]),
      switchMap(value => this.contractService.getAllContractsWithReferences(value))
    )
  }
}
