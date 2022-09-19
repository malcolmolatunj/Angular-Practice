import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function confirmEqual(
  formFieldOne: string,
  formFieldTwo: string
): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const fieldOneValue = form.get(formFieldOne).value;
    const fieldTwoValue = form.get(formFieldTwo).value;
    if (!fieldOneValue && !fieldTwoValue) {
      return null;
    }
    return fieldOneValue === fieldTwoValue ? null : { confirmEqual: true };
  };
}

export function blankAfterTrim(ctrl: AbstractControl): ValidationErrors | null {
  return ctrl.value?.trim().length === 0 && ctrl.value?.length > 0
    ? { isBlank: true }
    : null;
}
