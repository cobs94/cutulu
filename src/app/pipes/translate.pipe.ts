import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {

  private translations: { [key: string]: string } = {
    'strength': 'Fuerza',
    'constitution': 'Constitución',
    'dexterity': 'Destreza',
    'size': 'Tamaño',
    'hp': 'Puntos de vida',
    'mp': 'Puntos de magia',
    'sanity': 'Cordura',
    'luck': 'Suerte'
  };


  transform(value:string): string {
    return this.translations[value] || value;
  }

}
