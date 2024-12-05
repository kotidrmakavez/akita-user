import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UsersStoreService } from '../state/users.store.service';
import { map, Observable } from 'rxjs';

export class NameExistValidator {
  static createValidator(
    _usersStoreService: UsersStoreService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return _usersStoreService
        .checkIfNameAlreadyExists(control.value)
        .pipe(
          map((result: boolean) => (result ? { invalidAsync: true } : null))
        );
    };
  }
}
