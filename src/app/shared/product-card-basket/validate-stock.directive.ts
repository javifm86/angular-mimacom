import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidateStock]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidateStockDirective, multi: true }
  ]
})
export class ValidateStockDirective implements Validator {
  @Input('appValidateStock') stock: any;

  constructor() {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    const val = Number(control.value);

    if (!Number.isInteger(val) || val > this.stock || val < 0) {
      return {
        validateStock: 'Error en la validación'
      };
    }
    return null;
  }
}
