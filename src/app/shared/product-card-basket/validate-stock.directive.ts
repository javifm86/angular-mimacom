import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, AbstractControl, Validator } from "@angular/forms";

@Directive({
  selector: "[appValidateStock]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidateStockDirective, multi: true }
  ]
})
export class ValidateStockDirective implements Validator {
  @Input('appValidateStock') stock: any;

  constructor() {
    console.log('Stock: ',this.stock);
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    console.log('Stock: ',this.stock);
    const val = Number(control.value);
    if (!Number.isInteger(val) || val > this.stock) {
      return {
        validateStock:
          "Error en la validación"
      };
    }
    return null;
  }
}
