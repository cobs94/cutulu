import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { RouterLink } from '@angular/router';
import { EditCharacterComponent } from './edit-character/edit-character.component';
import { CommonModule } from '@angular/common';

@Component({
    imports: [RouterLink, EditCharacterComponent, CommonModule],
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  characters?:string[];
  character?:string;
  showEditCharacter:boolean = false;
  pressTimer: any;

  _httpClient = inject(ApiService);

  ngOnInit(): void {
    this.getCharacters();  
  }

  getCharacters(){
    this._httpClient.getCharactersByUser().subscribe({
      next: (data:any) => {
        console.log(data);
        this.characters = data;
      },
      error:(error:any) =>{
        console.log(error);
      } 
    })
  }

  showEditCharacterFunc(){
    this.showEditCharacter = !this.showEditCharacter;
  }

  EditCharacterOut($event:string){
    let index = this.characters?.indexOf($event);

    if (index !== -1) {
      this.characters?.splice(Number(index), 1);
    }

    this.showEditCharacterFunc();
  }

  onPress(character:string) {
    this.pressTimer = setTimeout(() => {
      this.character = character;
      this.showEditCharacterFunc();
    }, 1000);
  }

}