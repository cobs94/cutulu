import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroReplace',
  standalone: true
})
export class ZeroReplacePipe implements PipeTransform {

  transform(value: number): string | number {
    if (value === 0) {
      return '-';
    }else{
      return value;
    }
  }

}
