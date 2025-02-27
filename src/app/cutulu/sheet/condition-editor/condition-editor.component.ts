import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'condition-editor',
    imports: [FormsModule],
    templateUrl: './condition-editor.component.html',
    styleUrl: './condition-editor.component.css'
})
export class ConditionEditorComponent{
  @Input() conditionName?:string;

  @Output() conditionOut = new EventEmitter<string|null>();

  condition = '';

  saveCondition(save:boolean){
    if (save) {
      if (this.condition != '') {
        this.conditionOut.emit(this.condition);
      }else{
        this.conditionOut.emit(this.conditionName);
      }
    }else{
      this.conditionOut.emit(null);
    }
  }
}
