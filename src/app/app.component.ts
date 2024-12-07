import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersStoreService } from './shared/state/users.store.service';

import { NameExistValidator } from './shared/utils/name.validator';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    public _usersStoreService: UsersStoreService
  ) {}

  validatorEmit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit(): void {
    this.listenToNameChanges();
  }

  userCreationFormGroup: FormGroup = this._formBuilder.group({
    name: [
      '',
      {
        validators: [Validators.required],
        asyncValidators: [
          NameExistValidator.createValidator(this._usersStoreService),
        ],
      },
    ],
    active: [false, Validators.required],
  });

  submit(): void {
    const randomId = Math.floor(Math.random() * 100);
    const name = this.name?.value;
    const active = this.active?.value;

    if (this.userCreationFormGroup.valid) {
      this._usersStoreService.createUser(randomId, name, active);
      this.resetForm();
    }
  }

  get name() {
    return this.userCreationFormGroup.get('name');
  }

  get active() {
    return this.userCreationFormGroup.get('active');
  }

  listenToNameChanges(): void {
    this.name?.statusChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((status) => {
        if (status !== 'PENDING') {
          this.validatorEmit$.next(true);
        } else {
          this.validatorEmit$.next(false);
        }
      });
  }

  resetForm(): void {
    this.name?.reset();
    this.active?.setValue(false);
  }
}
