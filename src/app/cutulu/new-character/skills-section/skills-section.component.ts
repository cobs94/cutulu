import { KeyValuePipe, NgIf, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Skills } from 'src/app/models/character.model';
import { SkillsPipePipe } from 'src/app/pipes/skills-pipe.pipe';
import { ApiService } from 'src/app/services/api.service';
import { NewCharacterService } from 'src/app/services/new-character.service';
import { Customvalidators } from 'src/app/validators/customValidators';

@Component({
    selector: 'skills-section',
    imports: [KeyValuePipe, SkillsPipePipe, ReactiveFormsModule, NgIf, NgFor],
    templateUrl: './skills-section.component.html',
    styleUrl: './skills-section.component.css',
    standalone: true
})
export class SkillsSectionComponent implements OnInit{

  @Input() custom:boolean = false;
  @Output() changePage = new EventEmitter<number>();

  newCharacterService = inject(NewCharacterService);
  _httpClient = inject(ApiService);
  formBuilder = inject(FormBuilder);

  skillsForm = this.formBuilder.group({
    interestPointsForm:this.formBuilder.array([]),
    occupationPointsForm:this.formBuilder.group({
      occupationSkill: this.formBuilder.group({}),
      interpersonalSkills: this.formBuilder.group({}),
      extraSkills: this.formBuilder.group({}),
      personalSkills: this.formBuilder.group({}),
    }),
    customInterest: new FormControl('')
  })

  interestPointsForm = this.skillsForm.get('interestPointsForm') as FormArray;
  occupationPointsForm = this.skillsForm.get('occupationPointsForm') as FormGroup;
  occupationSkill = this.skillsForm.get('occupationPointsForm')?.get('occupationSkill') as FormGroup;
  interpersonalSkills = this.skillsForm.get('occupationPointsForm')?.get('interpersonalSkills') as FormGroup;
  extraSkills = this.skillsForm.get('occupationPointsForm')?.get('extraSkills') as FormGroup;
  personalSkills = this.skillsForm.get('occupationPointsForm')?.get('personalSkills') as FormGroup;
  customInterest = this.skillsForm.get('customInterest') as FormControl;


  allSkills:Skills = Object.assign({},this.newCharacterService.getDefaultSkills());
  actualSkills:Skills = {};

  occupationSkills?:any;
  occupationPointsCase?:number;

  intelligencePoints:number = Number(this.newCharacterService.getCharacteristics()?.INT) * 2;
  occupationPoints:number = 0;

  showOccupationForm:boolean = false;

  unsorted(a: any, b: any): number { return 0; }

  availableTypeSkills:{ [key: string]: string[] } = {};

  ngOnInit(): void {    
    this.allSkills['Esquivar'] = Math.floor(Number(this.newCharacterService.getCharacteristics()?.DES)/2);
    
    for (let key in this.allSkills) {
      this.addFieldFormInterest(this.allSkills[key]);
    }

    if (!this.custom) {
      this.interestPointsForm.setValidators([Customvalidators.sumEqualArray(this.interestPointsForm, this.intelligencePoints)]);   
    }

    this.interestPointsForm.get('Mitos_de_CthulhuInterest')?.disable();

    this._httpClient.getProfessionalSkills(this.newCharacterService.getOccupation()).subscribe({
      next: (data:any) => {
        this.occupationSkills = data;
        this.occupationPointsCase = data['occupationPoints'];
      },
      error:(error:any) =>{
        console.log(error);
      } 
    })
  }

  savePersonalSkills(){
    const index = Object.keys(this.allSkills);
    
    for (let i = 0; i < index.length; i++) {
      if (this.interestPointsForm.controls.at(i)?.value) {
        const key = index[i];
        this.actualSkills[key] = this.interestPointsForm.controls.at(i)?.value + this.allSkills[key];
        this.allSkills[key] = this.actualSkills[key];
      }
    }
    
    this.calcOccupationPoints();
    this.createOccupationForm();
    this.showOccupationForm = true;
    if (this.custom) {
      this.saveOccupationSkills();
    }
    window.scrollTo(0,0);
  }

  calcOccupationPoints(){
    var edu =  Number(this.newCharacterService.getCharacteristics()?.EDU);
    var des =  Number(this.newCharacterService.getCharacteristics()?.DES);
    var fue =  Number(this.newCharacterService.getCharacteristics()?.FUE);
    var pod =  Number(this.newCharacterService.getCharacteristics()?.POD);
    var apa =  Number(this.newCharacterService.getCharacteristics()?.APA);

    switch (this.occupationPointsCase) {
      case 1:
        this.occupationPoints = edu * 4;
        break;
      case 2:
        var largest = Math.max(des,fue);
        this.occupationPoints = (edu*2)+(largest*2);
        break;
      case 3:
        var largest = Math.max(pod,des);
        this.occupationPoints = (edu*2)+(largest*2);
        break;
      case 4:
        this.occupationPoints = (edu*2)+(apa*2);
        break;
      case 5:
        var largest = Math.max(apa,pod);
        this.occupationPoints = (edu*2)+(largest*2);
        break;
      case 6:
        this.occupationPoints = (edu*2)+(des*2);
        break;
      case 7:
        var largest = Math.max(apa,des,fue);
        this.occupationPoints = (edu*2)+(largest*2);
        break;
      default:
        break;
    }
  }

  createOccupationForm(){
    var arraySkillsCheck = Object.assign({}, this.allSkills);
    delete this.occupationSkills['occupationPoints'];

    for (let typeSkill in this.occupationSkills){
      this.availableTypeSkills[typeSkill] = [];

      for (let item in this.occupationSkills[typeSkill]){
        if(item == 'number'){
          this.availableTypeSkills[typeSkill].push(this.occupationSkills[typeSkill][item]);
        }else{
            for (let skill in this.occupationSkills[typeSkill][item]){
              var iSkill = this.occupationSkills[typeSkill]['skills'][skill];
              this.addFieldFormOccupation(typeSkill, iSkill, Number(this.availableTypeSkills[typeSkill][0]))
              this.availableTypeSkills[typeSkill].push(this.occupationSkills[typeSkill][item][skill]);
              delete arraySkillsCheck[this.occupationSkills[typeSkill][item][skill]];

            }
          }
        if (typeSkill == 'extraSkills') {
          for (let skill in arraySkillsCheck) {
            this.availableTypeSkills[typeSkill].push(skill);
            this.addFieldFormOccupation(typeSkill, skill, Number(this.availableTypeSkills[typeSkill][0]));
          }
        }
      }
    }
    this.occupationPointsForm.setValidators(Customvalidators.sumEqualOcu(this.occupationPoints));
    this.occupationPointsForm.updateValueAndValidity();
    this.extraSkills.get('Mitos_de_CthulhuOccupation')?.disable();
  }

  addFieldFormInterest(defaultValue:number) {
    const newField = this.formBuilder.control('', Customvalidators.moreThan(100,defaultValue));
    this.interestPointsForm.push(newField);
  }

  saveCustomSkills(){
    if(this.customInterest.value){
      let newSkill = this.customInterest.value;
      this.allSkills[newSkill] = 0;
      this.addFieldFormInterest(0);
      this.customInterest.setValue('');
    }
  }

  addFieldFormOccupation(typeSkill:string, skillName:string, restricted:number){
    switch (typeSkill) {
      case 'occupationSkill':
        this.occupationSkill.addControl(skillName+'Occupation', this.formBuilder.control('', Customvalidators.moreThan(100,this.allSkills[skillName])));
        this.occupationSkill.addValidators(Customvalidators.restringedAnswers(restricted));
        break;
      case 'interpersonalSkills':
        this.interpersonalSkills.addControl(skillName+'Occupation', this.formBuilder.control('', Customvalidators.moreThan(100,this.allSkills[skillName])));
        this.interpersonalSkills.addValidators(Customvalidators.restringedAnswers(restricted));
        break;
      case 'extraSkills':
        this.extraSkills.addControl(skillName+'Occupation', this.formBuilder.control('', Customvalidators.moreThan(100,this.allSkills[skillName])));
        this.extraSkills.addValidators(Customvalidators.restringedAnswers(restricted));
        break;
      case 'personalSkills':
        this.personalSkills.addControl(skillName+'Occupation', this.formBuilder.control('', Customvalidators.moreThan(100,this.allSkills[skillName])));
        this.personalSkills.addValidators(Customvalidators.restringedAnswers(restricted));
        break;

      default:
        break;
    }
  }

  saveOccupationSkills(){
    for (let key in this.occupationSkill.controls) {
      if (this.occupationSkill.get(key)?.value) {
        let newKey = key.replace('Occupation','');
        this.actualSkills[newKey] = this.occupationSkill.get(key)?.value + this.allSkills[newKey];
      }
    }
    for (let key in this.interpersonalSkills.controls) {
      if (this.interpersonalSkills.get(key)?.value) {
        let newKey = key.replace('Occupation','');
        this.actualSkills[newKey] = this.interpersonalSkills.get(key)?.value + this.allSkills[newKey];
      }
    }
    for (let key in this.extraSkills.controls) {
      if (this.extraSkills.get(key)?.value) {
        let newKey = key.replace('Occupation','');
        this.actualSkills[newKey] = this.extraSkills.get(key)?.value + this.allSkills[newKey];
      }
    }
    for (let key in this.personalSkills.controls) {
      if (this.personalSkills.get(key)?.value) {
        let newKey = key.replace('Occupation','');
        this.actualSkills[newKey] = this.personalSkills.get(key)?.value + this.allSkills[newKey];
      }
    }

    if (!this.actualSkills['Esquivar']) {
      this.actualSkills['Esquivar'] = this.allSkills['Esquivar'];
    }

    this.newCharacterService.setSkills(this.actualSkills);
    this.changePage.emit(3);
  }
}