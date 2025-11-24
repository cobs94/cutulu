import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditCharacterComponent } from './edit-character/edit-character.component';
import { CommonModule } from '@angular/common';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    imports: [RouterLink, EditCharacterComponent, CommonModule],
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  characters?:string[];
  character:string = '';
  showEditCharacter:boolean = false;
  pressTimer: any;

  db = inject(DatabaseService);

  ngOnInit(): void {
    this.getCharacters();  
  }

  async getCharacters(){
    this.characters = await this.db.getCharacterNames();
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