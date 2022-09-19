import { FormGroup } from "@angular/forms";

export interface BaseComponent {
  isFormPristine: () => boolean
}