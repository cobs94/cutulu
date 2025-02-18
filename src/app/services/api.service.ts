import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  private baseURL = 'http://127.0.0.1';

  private userName:string|null = '';

  _httpClient = inject(HttpClient);

  public login(name:string, pass:string): Observable<any>{

     this.userName = name;

    return this._httpClient.get<any>(`${this.baseURL}/api/login?userName=` + name + `&pass=` + pass);
  }

  public register(name:string, pass:string): Observable <any>{
    const body = {
      userName: name,
      pass: pass
    };

    this.userName = name;
    return this._httpClient.post<any>(`${this.baseURL}/api/register`, body);
 }

  public getCharactersByUser(): Observable <any>{
    this.checkUserName();
    return this._httpClient.get<any>(`${this.baseURL}/api/characters?userName=`+ this.userName);
  }

  public getSheetByCharacter(character:string): Observable <Character>{
    return this._httpClient.get<Character>(`${this.baseURL}/api/charactersSheet?name=`+ character);
  }

  public getOcupationList(): Observable <String[]>{
    return this._httpClient.get<String[]>(`${this.baseURL}/api/occupations`);
  }

  public getProfessionalSkills(occupation:string): Observable <any>{
    return this._httpClient.get<any>(`${this.baseURL}/api/professionalSkills?occupation=`+ occupation);
  }

  public getCredit(occupation:string): Observable <any>{
    return this._httpClient.get<any>(`${this.baseURL}/api/credit?occupation=`+ occupation);
  }

  public postCharacter(character:string, sheet:Character): Observable <any>{
    this.checkUserName();
    return this._httpClient.get<any>(`${this.baseURL}/api/saveCharacter?usuario=`+ this.userName + `&personaje=` + character + `&caracteristicas=` + JSON.stringify(sheet));
  }

  public editCharacter(character:string, sheet:Character): Observable <any>{
    this.checkUserName();
    const body = {
      userName: this.userName,
      characterName: character,
      newJson: sheet
    };

    return this._httpClient.post<any>(`${this.baseURL}/api/editCharacter`, body);
  }

  checkUserName(){
    if (this.userName == '') {
      this.userName = localStorage.getItem('username');
    }
  }
}
