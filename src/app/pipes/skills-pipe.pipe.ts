import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillsPipe',
  standalone: true
})
export class SkillsPipePipe implements PipeTransform {

  transform(value: string): string {
     // Reemplazar guiones bajos por espacios
     let replacedUnderscore = value.replace(/_o_/g, '/ ');
    
     // Reemplazar ceros por barras inclinadas
     let replacedZeros = replacedUnderscore.replace(/_/g, ' ');
     
     return replacedZeros;
  }

}
