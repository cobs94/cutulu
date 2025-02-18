import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Objects, Weapon } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { NewCharacterService } from 'src/app/services/new-character.service';

@Component({
  selector: 'inventory-section',
  standalone: true,
  imports: [KeyValuePipe, ReactiveFormsModule],
  templateUrl: './inventory-section.component.html',
  styleUrl: './inventory-section.component.css'
})
export class InventorySectionComponent {
  inventory: {[key:string]:number} = {};
  weapons: Weapon[] = [];

  formBuilder = inject(FormBuilder);
  newCharacterService = inject(NewCharacterService);
  apiService = inject(ApiService);
  router = inject(Router);
  
  inventoryForm = this.formBuilder.group({
    newItem: ['', Validators.required],
    quantity: ['', Validators.required],
    isWeapon: [''],
    skill: [''],
    damage: [''],
    range: [''],
    usesRound: [''],
    magazine: [''],
    malfunction: [''],
  })

  isEmpty(obj: { [key: string]: number | Weapon}): boolean {
    return Object.keys(obj).length === 0;
  }

  isWeapon(value: number | Weapon): value is Weapon{
    return (value as Weapon).number !== undefined;
  }

  addItem(){
    let item = String(this.inventoryForm.get("newItem")?.value);
    let quantity = Number(this.inventoryForm.get("quantity")?.value);

    if (quantity == 0) {
      quantity = 1;
    }

    if (this.inventoryForm.get('isWeapon')?.value) {
      let weapon:Weapon = {
        name: String(this.inventoryForm.get('newItem')?.value),
        number: quantity,
        skill: String(this.inventoryForm.get('skill')?.value),
        damage: String(this.inventoryForm.get('damage')?.value),
        range: Number(this.inventoryForm.get('range')?.value),
        usesRound: Number(this.inventoryForm.get('usesRound')?.value),
        magazine: Number(this.inventoryForm.get('magazine')?.value),
        malfunction: Number(this.inventoryForm.get('malfunction')?.value)
      }

      this.weapons.push(weapon);

    }

    this.inventory[item] = quantity;
    this.inventoryForm.reset();
  }

  deleteItem(name:string){
    delete this.inventory[name];
  }

  saveInventory(){
    let objects:Objects = this.inventory;
    this.newCharacterService.setObjects(objects);
    this.newCharacterService.setWeapons(this.weapons);

    let character = this.newCharacterService.getCharacter();

    this.apiService.postCharacter(character.data.name, character).subscribe({
      next: (data:any) =>{
        this.router.navigate(['list']);
      },
      error:(error:any) =>{
        console.log(error)
      }
    })
  }
}
