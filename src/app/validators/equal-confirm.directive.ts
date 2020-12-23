import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const equalConfirm: ValidatorFn | any = (control: FormGroup): ValidationErrors | null => {

    if ( control.get('password')?.value != control.get('password_confirm')?.value) {
        return {'equalConfirm': true}
    }
    return  null
}