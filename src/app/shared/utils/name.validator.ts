import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UsersStoreService } from '../state/users.store.service';
import {
  catchError,
  debounceTime,
  EMPTY,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

export class NameExistValidator {
  static createValidator(
    _usersStoreService: UsersStoreService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.trim() === '') {
        return of(null);
      }

      return of(control.value).pipe(
        debounceTime(300),
        switchMap((name) => _usersStoreService.checkIfNameAlreadyExists(name)),
        map((exist) => (exist ? { nameExist: true } : null)),
        catchError(() => of({ nameExist: true }))
      );
    };
  }
}
