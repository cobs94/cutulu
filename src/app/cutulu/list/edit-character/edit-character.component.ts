import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    selector: 'edit-character',
    imports: [],
    templateUrl: './edit-character.component.html',
    styleUrl: './edit-character.component.css'
})
export class EditCharacterComponent {

  @Input() characterName:string = '';
  @Output() close = new EventEmitter <string>;

  db = inject(DatabaseService);

  async removeCharacter(){
    await this.db.deleteCharacter(this.characterName);
    this.close.emit(this.characterName);
  }
    
}
