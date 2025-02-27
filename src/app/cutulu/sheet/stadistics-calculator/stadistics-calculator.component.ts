import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stats } from 'src/app/models/character.model';
import { NewCharacterService } from 'src/app/services/new-character.service';
import { Customvalidators } from 'src/app/validators/customValidators';

@Component({
    selector: 'stadistics-calculator',
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './stadistics-calculator.component.html',
    styleUrl: './stadistics-calculator.component.css'
})
export class StadisticsCalculatorComponent implements OnInit{

  @Input() statClicked:string = '';
  @Input() statCurrent:number = 0;
  @Output() expendedStat = new EventEmitter<any[]>();

  stats?:Stats = this.newCharacterService.getStats();
  maxStat:number = 0;
  formError:boolean = false;
  errorText:string = '';
  titleText:string = '';

  statsForm = this.formBuilder.group({
    affectedStat: ['', Validators.required, Customvalidators.moreThan(this.maxStat,0)],
    dice: [''],
    isThrow: ['']
  })

  constructor(private formBuilder: FormBuilder, private newCharacterService: NewCharacterService) { }

  ngOnInit(): void {
    if (this.stats) {
      switch (this.statClicked) {
        case 'hp':
          this.titleText = 'Modificar vida';
          this.maxStat = Number(this.stats?.maxStats.hpMax);
          break;
        case 'mp':
          this.titleText = 'Modificar magia';
          this.maxStat = Number(this.stats?.maxStats.mpMax);
          break;
        case 'sanity':
          this.titleText = 'Modificar cordura';
          this.maxStat = Number(this.stats?.maxStats.sanityMax);
          break;
        case 'luck':
          this.titleText = 'Modificar suerte';
          this.maxStat = Number(this.stats?.maxStats.luckMax);
          break;
        default:
          this.titleText = 'Modificar ' + this.statClicked;
          this.maxStat = 100;
      }
    }
  }

  add(){
    if (Number(this.statsForm.get('affectedStat')?.value) + this.statCurrent <= this.maxStat) {
      this.expendedStat.emit([ this.statClicked, this.statsForm.get('affectedStat')?.value]);
    }else{
      this.formError = true;
      this.errorText = 'No puedes superar ' + this.maxStat;
    }
  }

  rest(){
    let substract = Number(this.statsForm.get('affectedStat')?.value);

    if (this.statsForm.get('isThrow')?.value) {
      substract = Math.floor(Math.random() * Number(this.statsForm.get('dice')?.value)) + 1;
    }

    if ( substract - this.statCurrent <= 0) {
      this.expendedStat.emit([ this.statClicked, substract *-1]);
    }else{
      this.formError = true;
      this.errorText = 'No puedes tener menos de 0';
    }
  }
}
