import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators implements Validators{
  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value.length < min){
        return {minLength: true};
      }
      return null;
    }
  }
}



