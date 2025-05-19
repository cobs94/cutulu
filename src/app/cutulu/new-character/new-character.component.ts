import { Component, inject } from '@angular/core';
import { DataSectionComponent } from './data-section/data-section.component';
import { CharacteristicsSectionComponent } from './characteristics-section/characteristics-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';
import { CreditsSectionComponent } from './credits-section/credits-section.component';
import { InventorySectionComponent } from './inventory-section/inventory-section.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
    selector: 'app-new-character',
    imports: [DataSectionComponent, CharacteristicsSectionComponent, SkillsSectionComponent, CreditsSectionComponent, InventorySectionComponent, MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: './new-character.component.html',
    styleUrl: './new-character.component.css'
})
export class NewCharacterComponent{

  goToForm:number = 0;
  custom:boolean = false;

  _location = inject(Location);

  changeForm($event:number, custom?:boolean){
    this.goToForm = $event;
    if (custom) {
      this.custom = custom;
    }
  }

  goBack(){
    if (this.goToForm == 0) {
      this._location.back();
    } else{
      this.goToForm -= 1;
    }
  }
}
