import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    var symbol='$'

    return symbol+value;
  }

}
