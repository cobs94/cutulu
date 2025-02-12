import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceReplace',
  standalone: true
})
export class SpaceReplacePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value; 
    }
    return value.replace(/ /g, '+');
  }

}
