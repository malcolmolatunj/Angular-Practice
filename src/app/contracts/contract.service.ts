import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Contract, Status } from '../models';
import { UserService } from '../service/user.service';
import { CommonService } from '../service/common.service';

@Injectable()
export class ContractService {
  _url: string = 'assets/data/';
  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private commonService: CommonService
  ) {}

  getAllContracts(): Observable<Contract[]> {
    return this._http.get<Contract[]>(`${this._url}/contracts.json`);
  }

  getContractStatuses(): Observable<Status[]> {
    return this._http
      .get<Status[]>(`${this._url}/contractStatuses.json`)
      .pipe(shareReplay());
  }

  getContractById(id: number): Observable<Contract> {
    return this._http
      .get<Contract[]>(`${this._url}/contracts.json`)
      .pipe(map((contracts) => contracts.find((c) => c.id === id)));
  }

  getAllContractsWithReferences(
    filters = {
      status: null,
      dept: null,
      project: null,
      manager: null,
      country: null,
    }
  ): Observable<Contract[]> {
    const { status, dept, project, manager, country } = filters;
    return forkJoin([
      this.getAllContracts(),
      this.userService.getUsers(),
      this.commonService.getOffices(),
      this.commonService.getCurrencies(),
      this.getContractStatuses(),
    ]).pipe(
      map(([contracts, users, offices, currencies, statuses]) =>
        contracts
          .map((contract) => ({
            ...contract,
            createdDate: !!contract.createdDate
              ? new Date(contract.createdDate)
              : null,
            startDate: !!contract.startDate
              ? new Date(contract.startDate)
              : null,
            endDate: !!contract.endDate ? new Date(contract.endDate) : null,
            manager: users.find((u) => contract.managerId === u.id),
            office: offices.find((o) => contract.officeId === o.id),
            currencyCode: currencies.find((c) => contract.currencyId === c.id)
              .code,
            statusDescription: statuses.find((s) => contract.statusId === s.id)
              .status,
          }))
          .filter((contract) => {
            return (
              (contract.office.countryid === country || !country) &&
              (contract.managerId === manager || !manager)
            );
          })
      )
    );
  }
}
