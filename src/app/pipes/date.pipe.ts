import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Gdate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe:DatePipe) {
    
  }

  transform(value: Date|string|undefined, ...options: string[]): string|null {
    if(!value)
    return '';
    
    return this.datePipe.transform(value, 'dd/MM/yyyy hh:mm a', ...options);
  }

}
