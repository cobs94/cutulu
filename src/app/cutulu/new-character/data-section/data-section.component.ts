import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { NewCharacterService } from 'src/app/services/new-character.service';

@Component({
  selector: 'data-section',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './data-section.component.html',
  styleUrl: './data-section.component.css'
})
export class DataSectionComponent implements OnInit{

  newCharacterDataForm = this.formBuilder.group({
    characterName:  ['', Validators.required],
    characterAge: ['', Validators.required],
    characterOccupation: ['', Validators.required],
    characterSex: ['', Validators.required],
    characterResidence: ['', Validators.required],
    characterBirthplace: ['', Validators.required]
  });

  occupationList:string[] = [];

  @Output() changePage = new EventEmitter<number>();
  
  _httpClient = inject(ApiService);
  constructor(private formBuilder: FormBuilder, private newCharacterService: NewCharacterService) { }

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
    this.getOccupations();
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
