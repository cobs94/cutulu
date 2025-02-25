import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'edit-character',
  standalone: true,
  imports: [],
  templateUrl: './edit-character.component.html',
  styleUrl: './edit-character.component.css'
})
export class EditCharacterComponent {

  @Input() characterName?:string;
  @Output() close = new EventEmitter <string>;

  _httpClient = inject(ApiService);

  removeCharacter(){
     this._httpClient.removeCharacter(this.characterName!).subscribe({
       next : (data:any) => {
         console.log(data);
         this.close.emit(this.characterName);
       },
       error: (error:any) =>{
         console.log(error);
       }
     });
  }
    
}
