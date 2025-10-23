import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  private baseURL = 'https://cutulu.helioho.st';

  private userName:string|null = '';

  _httpClient = inject(HttpClient);

  public login(name:string, pass:string): Observable<any>{

     this.userName = name;

    const body = {
      userName: name,
      pass: pass
    };

    return this._httpClient.post<any>(`${this.baseURL}/login.php`, body);
  }

  public register(name:string, pass:string): Observable <any>{
    const body = {
      userName: name,
      pass: pass
    };

    this.userName = name;
    return this._httpClient.post<any>(`${this.baseURL}/register.php`, body);
 }

  public getCharactersByUser(): Observable <any>{
    this.checkUserName();
    return this._httpClient.get<any>(`${this.baseURL}/characters.php?userName=`+ this.userName);
  }

  public getSheetByCharacter(character:string): Observable <Character>{
    return this._httpClient.get<Character>(`${this.baseURL}/charactersSheet.php?name=`+ character);
  }

  public getOcupationList(): Observable <String[]>{
    return this._httpClient.get<String[]>(`${this.baseURL}/occupations.php`);
  }

  public getProfessionalSkills(occupation:string): Observable <any>{
    return this._httpClient.get<any>(`${this.baseURL}/professionalSkills.php?occupation=`+ occupation);
  }

  public getCredit(occupation:string): Observable <any>{
    return this._httpClient.get<any>(`${this.baseURL}/credit.php?occupation=`+ occupation);
  }

  public postCharacter(character:string, sheet:Character): Observable <any>{
    this.checkUserName();
    return this._httpClient.get<any>(`${this.baseURL}/saveCharacter.php?usuario=`+ this.userName + `&personaje=` + character + `&caracteristicas=` + JSON.stringify(sheet));
  }

  public editCharacter(character:string, sheet:Character): Observable <any>{
    this.checkUserName();
    const body = {
      userName: this.userName,
      characterName: character,
      newJson: sheet
    };

    return this._httpClient.post<any>(`${this.baseURL}/editCharacter.php`, body);
  }

  checkUserName(){
    if (this.userName == '') {
      this.userName = localStorage.getItem('username');
    }
  }

  public removeCharacter(character:string): Observable <any>{
    this.checkUserName();
    const body = {
      _method: "DELETE",
      userName: this.userName,
      characterName: character,
    };

    return this._httpClient.post<any>(`${this.baseURL}/deleteCharacter.php`, {body});
  }
}
