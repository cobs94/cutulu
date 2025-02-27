import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Skills } from 'src/app/models/character.model';

@Component({
    selector: 'level-up',
    imports: [NgIf],
    templateUrl: './level-up.component.html',
    styleUrl: './level-up.component.css'
})
export class LevelUpComponent {
  @Input() successSkills:string[] = [];
  @Input() skills: Skills = {};
  @Output() upgradedSkillsOut = new EventEmitter <Skills>;

  currentSkill: number = 0;
  upgradedSkills: Skills = {};

  textNext:string = 'Siguiente';

  textResult:string = '';
  upgradeNumber:number  = 0;

  upgrade(){
    let upgradeThrow = Math.floor(Math.random() * 100) + 1;
    if (upgradeThrow >= this.skills[this.successSkills[this.currentSkill]] || upgradeThrow >= 95) {
      this.upgradeNumber = Math.floor(Math.random() * 10) + 1;
      this.textResult = 'Mejorado: ' + upgradeThrow;
      this.upgradedSkills[this.successSkills[this.currentSkill]] = this.skills[this.successSkills[this.currentSkill]] + this.upgradeNumber;
    }else{
      this.textResult = 'No mejorado: ' + upgradeThrow;
    }

  }

  next(){
    if (this.currentSkill < this.successSkills.length - 1) {
      this.currentSkill++;
      this.textResult = '';
      this.upgradeNumber = 0;
      if (this.currentSkill == this.successSkills.length - 1) {
        this.textNext = 'Finalizar';
      }
    }else{
      this.upgradedSkillsOut.emit(this.upgradedSkills);
    }
  }
}
