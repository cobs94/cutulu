import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, isFormGroup } from '@angular/forms';

export class Customvalidators {
    
    static noRepeat(controls: string[], throws:number[]){
        return (group: AbstractControl) => {
            var controlsValue:number[] = [];

            controls.forEach((value, index) => {
                controlsValue.push(Number(group.get(controls[index])?.value));
            });

            throws.sort((a,b) => a-b);
            controlsValue.sort((a,b) => a-b);

            if (JSON.stringify(throws) === JSON.stringify(controlsValue)) {
                return null;
            }else{
                return { noRepeat: true };
            }
        }
    }

    static sumEqualArray(formArray: FormArray, equalTo:number) {
        return (group: AbstractControl) => {
            const sum = formArray.controls.reduce((acc, control) => {
                const valor = control.value;
                return acc + (valor ? Number(valor) : 0);
            }, 0);
        
            if (sum <= equalTo) {
                return null
            } else {
                return { sumEqual2: true };
            }
        }
    }

    static sumEqual(controls: string[], equalTo:number, formVariable:string){
        return (group: AbstractControl) => {
            var controlsValue:number[] = [];

            controls.forEach((value, index) => {
                controlsValue.push(Number(group.get(controls[index] + formVariable)?.value));
            });

            const sum = controlsValue.reduce((total, numero) => total + numero, 0);

            if (sum == equalTo) {
                return null
            } else {
                return { sumEqual: true };
            }
        }
    }

    static sumEqualOcu(equalTo:number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let suma = 0;

            if (isFormGroup(control)) {
                 // Iterar sobre cada grupo
                Object.keys(control.controls).forEach(grupoKey => {
                const grupo = control.get(grupoKey);
                    if (grupo && isFormGroup(grupo)) {
                    // Iterar sobre cada control en el grupo
                        Object.keys(grupo.controls).forEach(controlKey => {
                            const valor = grupo.get(controlKey)?.value || 0;
                            suma += valor;
                        });
                    }
                });
            }
            return suma > equalTo ? { 'sumaExcede100': true } : null;
      }
    }


    static moreThan(moreThan:number, minValue:number){
        return (group: AbstractControl) => {
            let value = Number(group.value);
            let rest = moreThan - (value + minValue);

            if (rest >= 0) {
                return null
            } else {
                return { moreThan: true };
            }
        }   
    }

    static restringedAnswers(numberAnswer:number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const fields = Object.values(control.value);
          const filledFields = fields.filter(field => field !== null && field !== '').length;
      
          return filledFields > numberAnswer ? { 'restringedAnswers': true } : null;
        };
    }

    // static restringedAnswers(controls: string[], numerChoices:number){
    //     return (group: AbstractControl) => {
    //         var controlsValue:number[] = [];

    //         controls.forEach((value, index) => {
    //             controlsValue.push(Number(group.get(controls[index])?.value));
    //         });

    //         throws.sort((a,b) => a-b);
    //         controlsValue.sort((a,b) => a-b);

    //         if (JSON.stringify(throws) === JSON.stringify(controlsValue)) {
    //             return null;
    //         }else{
    //             return { noRepeat: true };
    //         }
    //     }
    // }
}