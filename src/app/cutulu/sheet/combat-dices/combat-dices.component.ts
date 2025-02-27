import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'combat-dices',
    imports: [ReactiveFormsModule],
    templateUrl: './combat-dices.component.html',
    styleUrl: './combat-dices.component.css'
})
export class CombatDicesComponent implements OnInit{
  @Input() damage:string = '';
  @Input() successThreshold:number = 0;
  @Input() modyfierBonus?:number;
  @Input() diceBonus?:number;

  resultHit:number = 0;
  textResult:string = '';
  advantage:number = 0;

  resultsDamage:number[] = [];
  totalDamage:number = 0;

  isShotgun: boolean = false;

  rangeForm = this.formBuilder.group({
    range: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.damage.includes('/') ) {
      this.isShotgun = true;
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

    this.resultHit = result + units;

    this.changeResultText();
  }

  changeAdvantage(change:number):void{
    if (this.advantage <= 2 && change > 0 || this.advantage >= -2 && change < 0) {
      this.advantage += change;
    }
  }

  changeResultText(){
    switch (true) {
      case this.resultHit == 100:
        this.textResult = 'Pifia';
        break;
      case this.resultHit == 1:
        this.textResult = 'Crítico';
        break;
      case this.resultHit > this.successThreshold:
        this.textResult = 'Fracaso';
        break;
      case this.resultHit <= Math.floor(this.successThreshold / 5):
        this.textResult = 'Exito extremo';
        break;
      case this.resultHit <= Math.floor(this.successThreshold / 2):
        this.textResult = 'Exito dificil';
        break;
      case this.resultHit <= this.successThreshold:
        this.textResult = 'Exito';
        break;
      default:
        break;
    }
  }

  throwDamage(){
    this.resultsDamage = [];
    let splitDamage;
    let splitShotgun;

    if (this.isShotgun) {
      splitShotgun = this.damage.split(/\//);
      splitShotgun = splitShotgun[Number(this.rangeForm.get('range')?.value)];

      splitDamage = splitShotgun.split(/(?<!B)(D(?!B)|\+|\s+)/);
    }else{
      splitDamage = this.damage.split(/(?<!B)(D(?!B)|\+|\s+)/);
    }
    
    splitDamage.filter(part => part !== '' && part.trim() !== '');

    for (let i = 0; i < splitDamage.length; i++) {
      if (splitDamage[i] == "D") {
        this.throwDice(Number(splitDamage[i-1]), Number(splitDamage[i+1]));
      }
      if (typeof Number(splitDamage[i]) === 'number' && !isNaN(Number(splitDamage[i])) && splitDamage[i-1] != 'D' && splitDamage[i+1] != 'D' ) {
        this.resultsDamage.push(Number(splitDamage[i]));
      }
      if (splitDamage[i] == "BD" && this.diceBonus) {
        this.throwDice(Number(this.modyfierBonus), this.diceBonus);
      }else{
        if (splitDamage[i] == "BD" && !this.diceBonus) {
          this.resultsDamage.push(Number(this.modyfierBonus));
        }
      }
    }
    this.totalDamage = this.resultsDamage.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
  }

  throwDice(quantity:number, max:number){
    for (let i = 0; i < quantity; i++) {
      const randomNumber = Math.floor(Math.random() * (max)) + 1;
      this.resultsDamage.push(randomNumber);
    }
  }
}