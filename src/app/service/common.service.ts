import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Country, Currency, Language, Office, Role } from '../models';

@Injectable()
export class CommonService {

  _baseURL: string = '/assets/data/'

  constructor(private _http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(`${this._baseURL}/countries.json`).pipe(shareReplay())
  }

  getRoles(): Observable<Role[]> {
    return this._http.get<Role[]>(`${this._baseURL}/roles.json`)
  }

  getLanguages(): Observable<Language[]> {
    return this._http.get<Language[]>(`${this._baseURL}/languages.json`).pipe(shareReplay())
  }

  getOffices(): Observable<Office[]>{
    return this._http.get<Office[]>(`${this._baseURL}/offices.json`).pipe(shareReplay())
  }

  getCurrencies(): Observable<Currency[]> {
    return this._http.get<Currency[]>(`${this._baseURL}/currencies.json`).pipe(shareReplay())
  }
}