import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormattedDatePipe } from './formatted-date.pipe';
import { IntlCurrencyPipe } from './intl-currency.pipe';

const sharedDeclarables = [FormattedDatePipe, IntlCurrencyPipe];

@NgModule({
  imports: [CommonModule],
  exports: [sharedDeclarables],
  declarations: [sharedDeclarables],
})
export class SharedModule {}
