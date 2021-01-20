import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesFormsService {

  
  

  constructor() { }

  markAsTouched(formGroup: FormGroup) {
    if (formGroup) {
      const controls = Object.values(formGroup.controls);
      if (controls) {
        for (let control of controls) {
          control.markAllAsTouched();
        }
      }
    }      
  }

  getPatternEmailValido() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  getPatternSoloLettersSinTildes() {
    return /^[ÑñA-Za-z]*[ÑñA-Za-z][ÑñA-Za-z]*$/;
  }

  getPatternSoloNumerosLetrasPunto() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  }

  passwordsIguales(nombreControl1: string, nombreControl2: string) {
    return (formgroup: FormGroup) => {
      const controlPassword1 = formgroup.controls[nombreControl1];
      const controlPassword2 = formgroup.controls[nombreControl2];

      if (controlPassword1.value === controlPassword2.value) {
        controlPassword2.setErrors(null);
      } else {
        controlPassword2.setErrors( {noEsIgual: true} );
      }
    }
  }

}
