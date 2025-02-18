import { Component } from '@angular/core';
import { DataSectionComponent } from './data-section/data-section.component';
import { CharacteristicsSectionComponent } from './characteristics-section/characteristics-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';
import { CreditsSectionComponent } from './credits-section/credits-section.component';
import { InventorySectionComponent } from './inventory-section/inventory-section.component';

@Component({
  selector: 'app-new-character',
  standalone: true,
  imports: [ DataSectionComponent, CharacteristicsSectionComponent, SkillsSectionComponent, CreditsSectionComponent, InventorySectionComponent],
  templateUrl: './new-character.component.html',
  styleUrl: './new-character.component.css'
})
export class NewCharacterComponent{

  goToForm:number = 0;
  custom:boolean = false;

  changeForm($event:number, custom?:boolean){
    this.goToForm = $event;
    if (custom) {
      this.custom = custom;
    }
  }
}
