import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  characters?:string[]

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

}