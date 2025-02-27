import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Cash } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { NewCharacterService } from 'src/app/services/new-character.service';

@Component({
    selector: 'credits-section',
    imports: [ReactiveFormsModule, CurrencyPipe],
    templateUrl: './credits-section.component.html',
    styleUrl: './credits-section.component.css'
})
export class CreditsSectionComponent implements OnInit{
  @Output() changePage = new EventEmitter<number>();

  _httpClient = inject(ApiService);
  newCharacterService = inject(NewCharacterService);
  formBuilder = inject(FormBuilder);

  minCredit:number = 0;
  maxCredit:number = 0;

  money:number = 0;
  properties: number = 0;
  spendingLevel: number = 0;

  creditForm = this.formBuilder.group({
     credit: [''],
   })

  ngOnInit(): void {
    this._httpClient.getCredit(this.newCharacterService.getOccupation()).subscribe({
      next: (data:any) => {
        this.minCredit = data[0];
        this.maxCredit = data[1];
        this.calcCdredit(this.minCredit);
      },
      error:(error:any) =>{
        console.log(error);
      } 
    })

    this.creditForm.get('credit')?.valueChanges.subscribe(i => {
      let value = Number(i);
      this.calcCdredit(value);
    });
  }

  calcCdredit(value:number){

    switch (true) {
      case (value <= 0):
        this.money = 0.50;
        this.properties = 0;
        this.spendingLevel = 0.50;
        break;

      case (value >= 1 && value <= 9):          
        this.money = value;
        this.properties = value * 10;
        this.spendingLevel = 2;
        break;

      case (value >= 10 && value <= 49):
        this.money = value * 2;
        this.properties = value * 50;
        this.spendingLevel = 10;
        break;

      case (value >= 50 && value <= 89):
        this.money = value * 5;
        this.properties = value * 500;
        this.spendingLevel = 50;
        break;

      case (value >= 90 && value <= 98):
        this.money = value * 20;
        this.properties = value * 2000;
        this.spendingLevel = 250;
        break;

      case (value == 99):
        this.money = 50000;
        this.properties = 5000000;
        this.spendingLevel = 5000;
        break;
    }
  }

  saveCredit(){
    let cash:Cash = {
      spendingLevel: this.spendingLevel,
      cash:          this.money,
      assets:        this.properties
    };
    this.newCharacterService.setCash(cash);
    this.changePage.emit(4);
  }
}
