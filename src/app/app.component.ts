import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersStoreService } from './shared/state/users.store.service';
import { User } from './shared/models/user';
import { BehaviorSubject } from 'rxjs';
import { NameExistValidator } from './shared/utils/name.validator';

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

  ngOnInit(): void {
    // If this returns one item it is false
    console.log(this._usersStoreService.active);
    // Less than 5 for button check
    console.log(this._usersStoreService.count);
  }

  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

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
    const name = this.userCreationFormGroup.get('name')?.value;
    const active = this.userCreationFormGroup.get('active')?.value;

    if (this.userCreationFormGroup.valid && name) {
      this._usersStoreService.createUser(randomId, name, active);
      this.userCreationFormGroup.reset();
    }
  }

  get name() {
    return this.userCreationFormGroup.get('name');
  }

  get active() {
    return this.userCreationFormGroup.get('active');
  }
}
