import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intlCurrency',
})
export class IntlCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string,
    display: 'code' | 'symbol' | 'narrowSymbol' | 'name' = 'code'
  ): string {
    const options = {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: display,
    };
    return new Intl.NumberFormat('en-US', options).format(value);
  }
}
