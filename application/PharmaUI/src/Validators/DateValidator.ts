import { FormGroup } from '@angular/forms';

// custom validator to compare two dates fields 
export function DateValidate(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value >= matchingControl.value) {
            matchingControl.setErrors({ dateValidation: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}