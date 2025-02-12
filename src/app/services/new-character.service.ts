import { Injectable } from '@angular/core';
import { Data, Characteristics, Stats, Combat, Skills, Cash, Objects, Character, Weapon } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class NewCharacterService {

  private data?:Data;
  private characteristics?:Characteristics;
  private stats?:Stats
  private combat?:Combat;
  private skills?:Skills;
  private cash?:Cash;
  private objects?:Objects;
  private weapons?: Weapon[];

  defaultSkills: Skills = {
    Antropología: 1,
    Arma_corta: 20,
    Fusil_o_Escopeta: 25,
    Arqueología: 1,
    Arte_o_Artesanía: 5,
    Buscar_libros: 20,
    Cerrajería: 1,
    Charlatanería: 5,
    Ciencia: 1,
    Pelea: 25,
    Conducir_automóvil: 20,
    Conducir_maquinaria: 1,
    Contabilidad: 5,
    Derecho: 5,
    Descubrir: 25,
    Disfrazarse: 5,
    Electricidad: 10,
    Encanto: 15,
    Equitación: 5,
    Escuchar: 20,
    Esquivar: 0,
    Historia: 5,
    Intimidar: 15,
    Juego_de_manos: 10,
    Lanzar: 20,
    Otras_lenguas: 1,
    Mecánica: 10,
    Medicina: 1,
    Mitos_de_Cthulhu: 0,
    Nadar: 20,
    Naturaleza: 10,
    Ocultismo: 5,
    Orientarse: 10,
    Persuasión: 10,
    Pilotar: 1,
    Primeros_auxilios: 30,
    Psicoanálisis: 1,
    Psicología: 1,
    Saltar: 20,
    Seguir_rastros: 10,
    Sigilo: 20,
    Supervivencia: 10,
    Tasación: 5,
    Trepar: 20
  };

  constructor() { }

  getData(){
    return this.data;
  }

  setData(data:Data){
    this.data = data;
  }

  getCharacteristics(){
    return this.characteristics;
  }

  setCharacteristics(characteristics:Characteristics){
    this.characteristics = characteristics;
  }

  getStats(){
    return this.stats;
  }

  setStats(stats:Stats){
    this.stats = stats;
  }

  getCombat(){
    return this.combat;
  }

  setCombat(combat:Combat){
    this.combat = combat;
  }

  getAge():number{
    return Number(this.data?.age);
  }

  getOccupation():string{
    return String(this.data?.occupation);
  }

  getDefaultSkills():Skills{
    return this.defaultSkills;
  }

  setSkills(skills:Skills){
    this.skills = skills;
  }

  getSkills(){
    return this.skills;
  }

  getCash(){
    return this.cash;
  }

  setCash(cash:Cash){
    this.cash = cash;
  }

  getObjects(){
    return this.objects;
  }

  setObjects(objects:Objects){
    this.objects = objects;
  }

  getWeapons(){
    return this.weapons;
  }

  setWeapons(weapons:Weapon[]){
    this.weapons = weapons;
  }

  getCharacter(): Character{
    let character:Character = {
      data: this.data!,
      characteristics: this.characteristics!,
      stats: this.stats!,
      skills: this.skills!,
      successSkills: [],
      objects: this.objects!,
      weapons: this.weapons!,
      cash: this.cash!,
      combat: this.combat!,
      conditions: []
    }

    return character
  }
}
