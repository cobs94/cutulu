import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { NewCharacterService } from 'src/app/services/new-character.service';
import {MatMenuModule} from '@angular/material/menu';

@Component({
    selector: 'data-section',
    standalone: true,
    imports: [
      ReactiveFormsModule, 
      CommonModule,
      MatMenuModule,
    ],
    templateUrl: './data-section.component.html',
    styleUrl: './data-section.component.css'
})

export class DataSectionComponent implements OnInit{

  _httpClient = inject(ApiService);
  constructor( private newCharacterService: NewCharacterService) { }
  formBuilder = inject(FormBuilder);
  customTooltip: string = "Primera línea <br> Segunda línea";

  @Output() changePage = new EventEmitter<number>();

  newCharacterDataForm = this.formBuilder.group({
    characterName:  ['', Validators.required],
    characterAge: ['', Validators.required],
    characterOccupation: ['', Validators.required],
    characterSex: ['', Validators.required],
    characterResidence: ['', Validators.required],
    characterBirthplace: ['', Validators.required]
  });

  occupationList:string[] = [];

  saveDataCharacters(){
    let data:Data = {
      name:       String(this.newCharacterDataForm.get("characterName")?.value),
      age:        Number(this.newCharacterDataForm.get("characterAge")?.value),
      occupation: String(this.newCharacterDataForm.get("characterOccupation")?.value),
      sex:        String(this.newCharacterDataForm.get("characterSex")?.value),
      residence:  String(this.newCharacterDataForm.get("characterResidence")?.value),
      birthplace: String(this.newCharacterDataForm.get("characterBirthplace")?.value)
    };
    this.newCharacterService.setData(data);
    this.changePage.emit(1);
  }

  ngOnInit(): void {
    let data = this.newCharacterService.getData();
    this.getOccupations();
    if (data) {
      this.newCharacterDataForm.patchValue({
        characterName:  data.name,
        characterAge: String(data.age),
        characterOccupation: data.occupation,
        characterSex: data.sex,
        characterResidence: data.residence,
        characterBirthplace: data.birthplace
      });
    }
  }

  getOccupations(){
    this._httpClient.getOcupationList().subscribe({
      next: (data:any) => {
        this.occupationList = data;
      },
      error:(error:any) =>{
        console.log(error);
      } 
    })
  }

  hasErrors(controlName:string, errorType:string){
    return this.newCharacterDataForm.get(controlName)?.hasError(errorType) && this.newCharacterDataForm.get(controlName)?.touched
  }
}
