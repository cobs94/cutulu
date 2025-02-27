import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Weapon } from 'src/app/models/character.model';

@Component({
    selector: 'inventory-editor',
    imports: [ReactiveFormsModule],
    templateUrl: './inventory-editor.component.html',
    styleUrl: './inventory-editor.component.css'
})
export class InventoryEditorComponent {
  
  formBuilder = inject(FormBuilder);

  @Output() item = new EventEmitter<{name:string; quantity:number; weapon?: Weapon}>();
  
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

  saveInventory(){
    let updatedQuantity = Number(this.inventoryForm.get('quantity')?.value);

    if (updatedQuantity == 0) {
      updatedQuantity = 1;
    }

    let weaponData:Weapon = {
      name: String(this.inventoryForm.get('newItem')?.value),
      number: updatedQuantity,
      skill: String(this.inventoryForm.get('skill')?.value),
      damage: String(this.inventoryForm.get('damage')?.value),
      range: Number(this.inventoryForm.get('range')?.value),
      usesRound: Number(this.inventoryForm.get('usesRound')?.value),
      magazine: Number(this.inventoryForm.get('magazine')?.value),
      malfunction: Number(this.inventoryForm.get('malfunction')?.value)
    }

    const item = {
      name: String(this.inventoryForm.get('newItem')?.value),
      quantity: updatedQuantity,
      weapon: weaponData || null
    }

    this.item.emit(item);
  }
}
