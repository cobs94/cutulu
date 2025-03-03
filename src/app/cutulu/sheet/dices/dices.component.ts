import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'dices',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './dices.component.html',
    styleUrl: './dices.component.css'
})
export class DicesComponent {

  luckForm = this.formBuilder.group({
      luck: ['', Validators.required]
  })

  result:number = 0;
  advantage:number = 0;
  textResult?:string;

  luckSuccess:number = 0;
  luckHardSuccess:number = 0;
  luckExtremeSuccess:number = 0;
  luckOptions: string[] = [];
  noLuck:boolean = false;

  @Input() successThreshold:number = 0;
  @Input() currentLuck?:number = 0;
  @Input() typeThrow:string = '';
  @Output() expendedLuck = new EventEmitter<any[]>();
  @Output() markedSuccess = new EventEmitter<Boolean>();

  constructor(private formBuilder: FormBuilder) { }

  changeAdvantage(change:number):void{
    if (this.advantage <= 2 && change > 0 || this.advantage >= -2 && change < 0) {
      this.advantage += change;
    }
  }

  throwDices():void{
    var units = Math.floor(Math.random() * 10);
    var numberadvantage = Math.abs(this.advantage);
    var result = 0;
    
    for (let index = 0; index <= numberadvantage; index++) {
      var advantageRoll = Math.floor(Math.random() * 10);

      advantageRoll = advantageRoll * 10;

      if (advantageRoll == 0 && units == 0 ) {
        advantageRoll = 100;
      }

      if (index == 0) {
        result = advantageRoll;
      }

      if (this.advantage < 0 && advantageRoll > result) {
        result = advantageRoll;
      }else if (this.advantage > 0 && advantageRoll < result) {
        result = advantageRoll;
      }
    }

    this.result = result + units;

    this.changeResultText();
    this.changeLuckOptions();
  }

  changeResultText(){
    switch (true) {
      case this.result == 100:
        this.textResult = 'Pifia';
        break;
      case this.result == 1:
        this.textResult = 'Crítico';
        break;
      case this.result > this.successThreshold:
        this.textResult = 'Fracaso';
        break;
      case this.result <= Math.floor(this.successThreshold / 5):
        this.textResult = 'Exito extremo';
        break;
      case this.result <= Math.floor(this.successThreshold / 2):
        this.textResult = 'Exito dificil';
        break;
      case this.result <= this.successThreshold:
        this.textResult = 'Exito';
        break;
      default:
        break;
    }
  }

  changeLuckOptions(){
    this.luckOptions = [];
    this.luckSuccess = this.result - this.successThreshold;
    if (this.luckSuccess > 0) {
      this.luckOptions.push('exito');
    }
    this.luckHardSuccess = this.result - Math.floor(this.successThreshold / 2);
    if (this.luckHardSuccess > 0) {
      this.luckOptions.push('exito dificil');
    }
    this.luckExtremeSuccess = this.result - Math.floor(this.successThreshold / 5);
    if (this.luckExtremeSuccess > 0) {
      this.luckOptions.push('exito extremo');
    }
  }

  useLuck(){
    var successThreshold = 0;

    switch (this.luckForm.value.luck) {
      case 'exito':
        successThreshold = this.luckSuccess;
        break;
      case 'exito dificil':
        successThreshold = this.luckHardSuccess;
        break;
      
      case 'exito extremo':
        successThreshold = this.luckExtremeSuccess;        
        break;
    }

    if (successThreshold < Number(this.currentLuck)) {
      this.result = this.result - successThreshold;
      this.expendedLuck.emit(['luck', -successThreshold]);
    }else{
      this.noLuck = true;
    }

    this.luckOptions = [];
    this.changeResultText();
    this.changeLuckOptions();
  }

  markSuccess(){
    this.markedSuccess.emit(true);
  }
}
