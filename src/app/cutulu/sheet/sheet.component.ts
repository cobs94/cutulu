import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, Skills, Stats, Weapon } from 'src/app/models/character.model';
import { SkillsPipePipe } from 'src/app/pipes/skills-pipe.pipe';
import { ApiService } from 'src/app/services/api.service';
import { NewCharacterService } from 'src/app/services/new-character.service';
import { DicesComponent } from './dices/dices.component';
import { StadisticsCalculatorComponent } from './stadistics-calculator/stadistics-calculator.component';
import { SpaceReplacePipe } from 'src/app/pipes/space-replace.pipe';
import { InventoryEditorComponent } from './inventory-editor/inventory-editor.component';
import { CombatDicesComponent } from './combat-dices/combat-dices.component';
import { ConditionEditorComponent } from './condition-editor/condition-editor.component';
import { LevelUpComponent } from './level-up/level-up.component';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [SkillsPipePipe, NgFor, NgIf, KeyValuePipe, DicesComponent, StadisticsCalculatorComponent, SpaceReplacePipe, InventoryEditorComponent, CombatDicesComponent, NgClass, ConditionEditorComponent, LevelUpComponent, TranslatePipe],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.css'
})
export class SheetComponent implements AfterViewInit, OnInit {

  defaultSkills: Skills = Object.assign({},this.newCharacterService.getDefaultSkills());

  character?: Character;

  allSkills: Skills = {};
  dodge?: number;

  checkboxStates: Record<string,boolean> = {};

  showNav:string = 'character';
  navs: string[] = ['character', 'stats', 'skill', 'combat', 'inventory'];

  showDices:boolean = false;
  successThreshold:number = 0;
  clickedSkill:string = '';
  typeThrow:string = '';

  showCalculator:boolean = false; 
  statClicked:string = '';
  statCurrent:number = 0;

  showInventory:boolean = false;
  deleteMode:boolean = false;

  showCombat:boolean = false;
  damage:string = '';

  showCondition:boolean = false;
  conditionName?:string;

  showLevelUp:boolean = false;
  successSkills:string[] = [];

  _route = inject(ActivatedRoute);
  _httpClient = inject(ApiService);
  
  constructor( private newCharacterService: NewCharacterService) { }

  unsorted(a: any, b: any): number { return 0; }

  @ViewChild('swipeZone', { static: false }) swipeZone!: ElementRef;

  ngAfterViewInit() {
    if (this.swipeZone) {
      const hammer = new Hammer(this.swipeZone.nativeElement);

      hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

      hammer.on('swipeleft', () => this.onSwipeLeft());
      hammer.on('swiperight', () => this.onSwipeRight());
    }
  }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this._httpClient.getSheetByCharacter(params['character']).subscribe({
        next : (data:Character) => {
        this.character = data;
        this.compareSkills();
        this.markSkills();
        console.log(this.character?.successSkills);
        let stats: Stats = {
          "currentStats": {
              "hp": Number(this.character?.stats.currentStats.hp),
              "mp": Number(this.character?.stats.currentStats.mp),
              "sanity": Number(this.character?.stats.currentStats.sanity),
              "luck": Number(this.character?.stats.currentStats.luck)
            },
            "maxStats": {
              "hpMax": Number(this.character?.stats.maxStats.hpMax),
              "mpMax": Number(this.character?.stats.maxStats.mpMax),
              "sanityMax": Number(this.character?.stats.maxStats.sanityMax),
              "luckMax": Number(this.character?.stats.maxStats.luckMax)
            }
        }
    
        this.newCharacterService.setStats(stats);
        },
        error: (error:any) =>{
          console.log(error);
        }
      });
    })
  }

  hardThrow(tirada: number): number {
    let hardThrow: number = Math.floor(tirada / 2);

    if (hardThrow == 0) {

      return 1;

    } else {

      return hardThrow;
    }
  }

  epicThrow(tirada: number): number {

    let epicThrow: number = Math.floor(tirada / 5);

    if (epicThrow == 0) {

      return 1;

    } else {

      return epicThrow;
    }
  }

  compareSkills(): void {

    this.allSkills = this.defaultSkills;

    for (let key in this.character?.skills) {
      this.allSkills[key] = this.character?.skills[key];
    }
  }

  markSkills():void {
    for (let key in this.allSkills) { 
      if (!this.checkboxStates.hasOwnProperty(key+"Checkbox")) {
        if (this.character?.successSkills.includes(key)) {
          this.checkboxStates[key+"Checkbox"] = true;
        }else{
          this.checkboxStates[key+"Checkbox"] = false;
        }
      }
    }
  }

  showDicesFunc(successThreshold:number, clickedSkill:string, typeThrow:string):void {
    this.successThreshold = successThreshold;
    this.clickedSkill = clickedSkill;
    this.showDices = !this.showDices;
    this.typeThrow = typeThrow;
  }

  showCalculatorFunc(statClicked:string, statCurrent:number):void {
    this.statClicked = statClicked;
    this.statCurrent = statCurrent;
    this.showCalculator = !this.showCalculator;
  }
  
  showInvFunc():void {
    this.showInventory = !this.showInventory;
  }

  showCombatFunc(successThreshold:number, damage:string):void{
    this.showCombat = !this.showCombat;
    this.successThreshold = successThreshold;
    this.damage = damage;
  }

  showConFunc(conditionName?:string){
    this.showCondition = !this.showCondition;
    this.conditionName = conditionName;
  }

  showLevelFunc(){
    this.showLevelUp = !this.showLevelUp;
    this.successSkills = this.character?.successSkills!;
  }

  expendedStatRecived($event:any[]){
    if (this.character) {
      switch ($event[0]) {
        case 'hp':
          this.character.stats.currentStats.hp = this.character?.stats.currentStats.hp + $event[1];
          this.makeDamage($event[1]);
          break;
        case 'mp':
          this.character.stats.currentStats.mp = this.character?.stats.currentStats.mp + $event[1];
          break;
        case 'sanity':
          this.character.stats.currentStats.sanity = this.character?.stats.currentStats.sanity + $event[1];
          break;
        case 'luck':
          this.character.stats.currentStats.luck = this.character?.stats.currentStats.luck + $event[1];
          break;

        default:
          this.character.objects[$event[0]] = this.character.objects[$event[0]] + $event[1];
          if (this.character.objects[$event[0]] < 1) {
            delete this.character?.objects[$event[0]];

            if (this.character && this.character.objects) {
              for (let index = 0; index < this.character.weapons.length; index++) {
                if (this.character.weapons[index].name == $event[0]) {
                  this.character.weapons.splice(index,1);
                }
              }
            }
          }else{
            break;
          }
      }
    }
    this.saveCharacter();
    this.showCalculator = false;
  }

  makeDamage(damage:number){
    if (this.character && damage < 0) {
      let majorWound = false;
      if (this.character.conditions.includes('Herida grave')) {
        majorWound = true;
      }
      switch (true) {
        case Math.abs(damage) >= this.character?.stats.maxStats.hpMax:
          this.character.conditions.push('Muerto');
          break;
        case majorWound && this.character.stats.currentStats.hp <= 0:
          this.character.conditions.push('Moribundo');
          break;
        case !majorWound && this.character.stats.currentStats.hp <= 0:
          this.character.conditions.push('Inconsciente');
          break;
        case Math.abs(damage) >= Math.floor(this.character?.stats.maxStats.hpMax/2):
          this.character.conditions.push('Herida grave');
          break;
        default:
          break;
      }
    }

  }

  markSkill($event:Boolean){
    var checkbox = document.getElementById(this.clickedSkill+'Checkbox') as HTMLInputElement;
    if ($event == true && checkbox && !this.character?.successSkills.includes(this.clickedSkill)) {
      checkbox.checked = true;
      this.character?.successSkills.push(this.clickedSkill);
      this.showDices = false;
      this._httpClient.editCharacter(this.character?.data.name!, this.character!).subscribe({
        next : (data:any) => {
          console.log(data);
        },
        error: (error:any) =>{
          console.log(error);
        }
      });
    }else{
      this.showDices = false;
    }
  }

  addItem(item:{name:string; quantity:number; weapon?: Weapon}){
    if(item.weapon?.damage){
      this.character?.weapons.push(item.weapon);
    }

    if (this.character && this.character.objects) {
      this.character.objects[item.name] = item.quantity;
    }

    this.saveCharacter();

    this.showInventory = false;
  }

  enterDeleteMode(){
    if (this.deleteMode) {
      this.saveCharacter();
    }
    this.deleteMode = !this.deleteMode;
  }

  changeCondition($event:string|null){
    if ($event) {
      if (this.character) {
        if (this.character.conditions.includes($event)) {
          this.character.conditions = this.character.conditions.filter(item => item !== $event);  
        }else{
          this.character.conditions.push($event);
        }
      }
    }
    this.saveCharacter();
    this.showCondition = !this.showCondition;
  }

  endUpgrade($event:Skills){
    if (this.character) {
      for (let key in $event) {
        this.character.skills[key] = $event[key];
        if ($event[key] >= 90) {
          let sanityThrow = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
          if (this.character.stats.currentStats.sanity + sanityThrow >= this.character.stats.maxStats.sanityMax) {
            this.character.stats.currentStats.sanity = this.character.stats.maxStats.sanityMax;
          }else{
            this.character.stats.currentStats.sanity += sanityThrow;
          }
        }
      }
      this.character.successSkills = [];
      this.successSkills = [];
    }
    this.markSkills();
    this.compareSkills();
    this.saveCharacter();
    this.showLevelUp = !this.showLevelUp;
  }

  changeTab(tab:string){
    this.showNav = tab;
  }

  modItem(name:string, quantity:number){
    this.showCalculatorFunc(name, quantity);
  }

  saveCharacter(){
    this._httpClient.editCharacter(this.character?.data.name!, this.character!).subscribe({
      next : (data:any) => {
        console.log(data);
      },
      error: (error:any) =>{
        console.log(error);
      }
    });
  }

  onSwipeLeft() {
    if (this.showNav != 'character') {
      this.showNav = this.navs[this.navs.indexOf(this.showNav) + 1];
    }
  }

  onSwipeRight() {
    if (this.showNav != 'inventory') {
      this.showNav = this.navs[this.navs.indexOf(this.showNav) - 1];
    }
  }
}


