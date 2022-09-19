import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedDate',
})
export class FormattedDatePipe implements PipeTransform {
  transform(value: string | number | Date): string {
    return new DatePipe('en-US').transform(value, 'dd MMM yyyy');
  }
}
