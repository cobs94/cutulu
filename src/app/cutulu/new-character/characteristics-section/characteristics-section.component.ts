import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Characteristics, Combat, Stats } from 'src/app/models/character.model';
import { NewCharacterService } from 'src/app/services/new-character.service';
import { Customvalidators } from 'src/app/validators/customValidators';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import {MatMenuModule} from '@angular/material/menu';


@Component({
    selector: 'app-characteristics',
    imports: [NgIf, ReactiveFormsModule, TranslatePipe, MatMenuModule],
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

  tooltipContent:string = "";

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

  changeCharMenu(char:string){
    switch (char) {
      case 'fuerza':
        this.tooltipContent = "La Fuerza mide la capacidad muscular de un investigador. Cuanta más alta sea, más peso podrá levantar y podrá aferrarse a algo con más firmeza. Esta característica determina el daño que causa un investigador en combate cuerpo a cuerpo. Si la FUE de un investigador se reduce a O este quedará inválido, incapaz de levantarse de la cama." ;
        break;
      case 'destreza':
        this.tooltipContent = "La Destreza mide la rapidez, agilidad y flexibilidad. Sirve para intentar agarrarse a algo y evitar una caída, moverse más rápido que un adversario o llevar a cabo alguna acción delicada. Un investigador sin DES carecerá de coordinación y será incapaz de realizar tareas físicas. Durante el combate, el personaje con la DES más alta actúa primero.";
        break;
      case 'constitucion':
        this.tooltipContent = "La Constitución representa la salud, el vigor y la vitalidad. Cuanta más baja sea, las enfermedades y los venenos pueden afectar más. Con una Constitución elevada se tiene más Puntos de Vida. Una lesión física grave o un ataque mágico podrían reducir la característica y, si la constitución llegara a cero, el investigador moriría.";
        break;
      case 'apariencia':
        this.tooltipContent = "La Apariencia representa el atractivo físico y la personalidad. Cuanta más alta sea, se es más encantador y agradable, pero podría carecer de una belleza convencional. Una Apariencia de 0 se es terriblemente feo, y puede que también posea un comportamiento detestable y provoque comentarios y conmoción allá donde vaya.";
        break;
      case 'poder':
        this.tooltipContent = "El Poder indica la fuerza de voluntad y, cuanto mayor es su valor, mayores son también las aptitudes para la magia y para resistirse a ella. Un Poder bajo hace del personaje un zombi sin «aspiraciones>> e incapaz de hacer uso de la magia. La cantidad de Puntos de Cordura es igual al Poder. También determina la cantidad de «Puntos de Magia» de un personaje.";
        break;
      case 'inteligencia':
        this.tooltipContent = "La Inteligencia representa lo bien que los investigadores son capaces de aprender, recordar y analizar información, y lo bien que resuelven enigmas. La Inteligencia determina la cantidad de puntos para habilidades de interés particular que se adjudican a un nuevo investigador.";
        break;
      case 'tamaño':
        this.tooltipContent = "El Tamaño representa tanto la estatura como el peso con un solo número. Utilízala para determinar si alguien es capaz de echar un vistazo por encima de un muro, escurrirse a través de una pequeña abertura o, incluso, para averiguar de quién es la cabeza que asoma sobre la hierba. El Tamaño sirve para determinar los Puntos de Vida, la Bonificación al daño y la Corpulencia.";
        break;
      case 'educacion':
        this.tooltipContent = "La Educación es una medida de los conocimientos formales y objetivos, así como un indicador del tiempo que ha dedicado a su educación. La Educación mide la información de la que se dispone, no el uso inteligente de la misma. Un personaje sin Educación es como un niño recién nacido o como un amnésico sin ningún conocimiento acerca del mundo. Con una Educación de 60 el personaje ha terminado el bachillerato, una de 70 indica que esa persona ha pasado algunos años en la universidad. Con una de 80 se tiene un título universitario. Una Educación elevada puede deberse a un autodidacta y no solo que posea títulos académicos. La Educación determina cuántos puntos para habilidades de ocupación se tiene, y representa su porcentaje inicial de la habilidad de Lengua propia.";
        break;
    
      default:
        break;
    }
  }

  hasErrors(form:string, errorType:string, controlName?:string){
    if (controlName) {
      return this.newCharacterCharacteristicsForm.get(form)?.get(controlName)?.hasError(errorType) && this.newCharacterCharacteristicsForm.get(form)?.get(controlName)?.touched; 
    }else{
      return this.newCharacterCharacteristicsForm.get(form)?.hasError(errorType) && this.newCharacterCharacteristicsForm.get(form)?.touched; 
    }
  }
}
