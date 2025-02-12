import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Characteristics, Combat, Stats } from 'src/app/models/character.model';
import { NewCharacterService } from 'src/app/services/new-character.service';
import { Customvalidators } from 'src/app/validators/customValidators';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';


@Component({
  selector: 'app-characteristics',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, TranslatePipe],
  templateUrl: './characteristics-section.component.html',
  styleUrl: './characteristics-section.component.css'
})
export class CharacteristicsSectionComponent implements OnInit{

  newCharacterCharacteristicsForm = this.formBuilder.group({
    characteristicsForm: this.formBuilder.group({
      strength: ['', Validators.required],
      dexterity: ['', Validators.required],
      constitution: ['', Validators.required],
      appearance: ['', Validators.required],
      power: ['', Validators.required],
      intelligence: ['', Validators.required],
      size: ['', Validators.required],
      education: ['', Validators.required]
    }),
    modByAgeForm: this.formBuilder.group({})
  });

  characteristicsForm = this.newCharacterCharacteristicsForm.get('characteristicsForm') as FormGroup;
  modByAgeForm = this.newCharacterCharacteristicsForm.get('modByAgeForm') as FormGroup;

  age: number = 0 ;
  size: number = 0;
  education: number = 0;
  appearance: number = 0;
  strength: number = 0;
  constitution: number = 0;
  dexterity: number = 0;

  characteristicsArray:{[key:string]:any} = {};

  modCharacteristics: number = 0;
  characteristicsModByAge:string[] = [];

  combat: Combat={
    "damageBonus":{
      modifyer:   0,
      dice:     null
    },
    "build":    0
  }

  custom: boolean = false;

  @Output() changePage = new EventEmitter<[number, boolean]>();

  buttonClicked:boolean = false;

  constructor(private formBuilder: FormBuilder, private newCharacterService: NewCharacterService) { }

  ngOnInit(): void {
    this.characteristicsForm.valueChanges.subscribe(valor =>{
      if (this.characteristicsForm.valid) {
        this.size = Number(this.characteristicsForm.get("size")?.value);
        this.education = Number(this.characteristicsForm.get("education")?.value);
        this.appearance = Number(this.characteristicsForm.get("appearance")?.value);
        this.strength = Number(this.characteristicsForm.get("strength")?.value);
        this.constitution = Number(this.characteristicsForm.get("constitution")?.value);
        this.dexterity = Number(this.characteristicsForm.get("dexterity")?.value);
        this.age = this.newCharacterService.getAge();
        this.modifiersByAge();
      }
    })
  }

  characteristicsThrow(){
    this.characteristicsArray['firstThrow'] = [];
    this.characteristicsArray['secondThrow'] = [];

    for (let i = 0; i < 5; i++) {
      var randomNum = Math.floor(Math.random() * (18 - 3 + 1)) + 3;
      randomNum = randomNum * 5;
      this.characteristicsArray['firstThrow'].push(randomNum);
    }

    for (let i = 0; i < 3; i++) {
      var randomNum = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
      randomNum = (randomNum + 6) * 5;
      this.characteristicsArray['secondThrow'].push(randomNum);
    }
    this.characteristicsForm.setValidators([Customvalidators.noRepeat(['strength','dexterity','constitution','appearance', 'power'], this.characteristicsArray['firstThrow']),
    Customvalidators.noRepeat(['size','intelligence','education'], this.characteristicsArray['secondThrow'])]);
    this.buttonClicked = true;
  }

  characteristicsCustom(){
    this.characteristicsForm.get('strength')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.characteristicsForm.get('dexterity')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.characteristicsForm.get('constitution')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.characteristicsForm.get('appearance')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.characteristicsForm.get('power')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.characteristicsForm.get('size')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.characteristicsForm.get('intelligence')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.characteristicsForm.get('education')?.setValidators([Validators.required, Customvalidators.moreThan(100,0)]);
    this.custom = true;
    this.buttonClicked = true;
  }

  calcMov():number{
    let modByAge:number = this.changeMovByAge();

    switch (true) {
      case this.size > this.strength && this.size > this.dexterity:
        return 7 - modByAge;
      case this.size < this.strength && this.size < this.dexterity: 
        return 9 - modByAge;
      default:
        return 8 - modByAge;
    }
  }

  changeMovByAge():number{

    switch(true){
      case this.age >= 40 && this.age <= 49:
        return 1;
      case this.age >= 50 && this.age <= 59:
        return 2;
      case this.age >= 60 && this.age <= 69:
        return 3;
      case this.age >= 70 && this.age <= 79:
        return 4;
      case this.age >= 80:
        return 5;
      default:
        return 0;
    }
  }

  modifiersByAge(){
    switch(true){
      case this.age >= 15 && this.age <= 19:
        this.modCharacteristics = 5;
        this.characteristicsModByAge = ["strength", "size"];
        this.education -= 5; 
        break;
      case this.age >= 20 && this.age <= 39:
        this.eduImprovementCheck(1);
        break;
      case this.age >= 40 && this.age <= 49:
        this.modCharacteristics = 5;
        this.characteristicsModByAge = ["strength", "constitution", "dexterity"];
        this.appearance -= 5;
        this.eduImprovementCheck(2);
        break;
      case this.age >= 50 && this.age <= 59:
        this.modCharacteristics = 10;
        this.characteristicsModByAge = ["strength", "constitution", "dexterity"];
        this.appearance -= 10;
        this.eduImprovementCheck(3);
        break;
      case this.age >= 60 && this.age <= 69:
        this.modCharacteristics = 20;
        this.characteristicsModByAge = ["strength", "constitution", "dexterity"];
        this.appearance -= 20;
        this.eduImprovementCheck(4);
        break;
      case this.age >= 70 && this.age <= 79:
        this.modCharacteristics = 40;
        this.characteristicsModByAge = ["strength", "constitution", "dexterity"];
        this.appearance -= 20;
        this.eduImprovementCheck(4);
        break;
      case this.age >= 80:
        this.modCharacteristics = 80;
        this.characteristicsModByAge = ["strength", "constitution", "dexterity"];
        this.appearance -= 25;
        this.eduImprovementCheck(4);
        break;
      default:
        break;
    }
    this.characteristicsModByAge.forEach(element => {
      this.addField(element + "AgeMod", element);
    });
    
    this.modByAgeForm.setValidators([Customvalidators.sumEqual(this.characteristicsModByAge, this.modCharacteristics, "AgeMod")]);
  }

  addField(fieldName: string, actualValueName:string) {
    var actualValue:number = Number(this.characteristicsForm.get(actualValueName)?.value);
    this.modByAgeForm.addControl(fieldName, this.formBuilder.control('', Customvalidators.moreThan(actualValue,0)));
  }

  eduImprovementCheck(numThrows:number){
    for (let index = 0; index < numThrows; index++) {
      var randomNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      if (randomNum > this.education && this.education < 99){
        this.education += Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        if(this.education > 99){
          this.education = 99;
        }
      }
    }
  }

  calcLuck():number{
    var randomNum = Math.floor(Math.random() * (18 - 3 + 1)) + 3;

    if(this.age < 20){
      let advantage = Math.floor(Math.random() * (18 - 3 + 1)) + 3;

      if(randomNum < advantage ){
        return advantage * 5;
      }
    }
    return randomNum * 5;
  }

  calcCombat(){

    let sum: number = this.strength + this.size;

    switch (true) {
      case sum < 64:
        this.combat.damageBonus.modifyer = -2;
        this.combat.build = -2;
        break;

      case sum > 65 && sum < 84:
        this.combat.damageBonus.modifyer = -1;
        this.combat.build = -1;
        break;

      case sum > 85 && sum < 124:
        this.combat.damageBonus.modifyer = 0;
        this.combat.build = 0;
        break;

      case sum > 125 && sum < 164:
        this.combat.damageBonus.modifyer = 1;
        this.combat.damageBonus.dice = 4;
        this.combat.build = 1;
        break;

      case sum > 165 && sum < 204:
        this.combat.damageBonus.modifyer = 1;
        this.combat.damageBonus.dice = 6;
        this.combat.build = 2;
        break;

      default:
        break;
    }
  }

  saveCharacteristicsCharacter(){
    this.strength -= this.modByAgeForm.get("strenthAgeMod")?.value | 0;
    this.size -= this.modByAgeForm.get("sizeAgeMod")?.value | 0;
    this.constitution -= this.modByAgeForm.get("constitutionAgeMod")?.value | 0;
    this.dexterity -= this.modByAgeForm.get("dexterityAgeMod")?.value | 0;
    
    this.calcCombat();

    let characteristics: Characteristics = {
      FUE:    this.strength,
      DES:    this.dexterity,
      POD:    Number(this.characteristicsForm.get("power")?.value),
      CON:    this.constitution,
      APA:    this.appearance,
      EDU:    this.education,
      TAM:    this.size,
      INT:    Number(this.characteristicsForm.get("intelligence")?.value),
      Mov:    this.calcMov()
    };

    let stats: Stats = {
      "currentStats": {
          "hp": Math.floor((this.size + Number(this.characteristicsForm.get("constitution")?.value))/10),
          "mp": Math.floor(Number(this.characteristicsForm.get("power")?.value)/5),
          "sanity": Number(this.characteristicsForm.get("power")?.value),
          "luck": this.calcLuck()
        },
        "maxStats": {
          "hpMax": Math.floor((this.size + Number(this.characteristicsForm.get("constitution")?.value))/10),
          "mpMax": Math.floor(Number(this.characteristicsForm.get("power")?.value)/5),
          "sanityMax": Number(this.characteristicsForm.get("power")?.value),
          "luckMax": this.calcLuck()
        }
    }

    this.newCharacterService.setCharacteristics(characteristics);
    this.newCharacterService.setStats(stats);
    this.newCharacterService.setCombat(this.combat);
    this.changePage.emit([2, this.custom]);
  }

  hasErrors(form:string, errorType:string, controlName?:string){
    if (controlName) {
      return this.newCharacterCharacteristicsForm.get(form)?.get(controlName)?.hasError(errorType) && this.newCharacterCharacteristicsForm.get(form)?.get(controlName)?.touched; 
    }else{
      return this.newCharacterCharacteristicsForm.get(form)?.hasError(errorType) && this.newCharacterCharacteristicsForm.get(form)?.touched; 
    }
  }
}
