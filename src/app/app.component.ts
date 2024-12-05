import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersStoreService } from './shared/state/users.store.service';
import { User } from './shared/models/user';
import { BehaviorSubject } from 'rxjs';

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

  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  // TODO: Async validator

  userCreationFormGroup: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    active: [false, Validators.required],
  });

  ngOnInit(): void {
    this._usersStoreService.usersFromStore$.subscribe((res) => {
      console.log(res);
    });
  }

  submit(): void {
    const randomId = Math.floor(Math.random() * 100);
    const name = this.userCreationFormGroup.get('name')?.value;
    const active = this.userCreationFormGroup.get('active')?.value;

    if (this.userCreationFormGroup.valid && name) {
      this._usersStoreService.createUser(randomId, name, active);
      this.userCreationFormGroup.reset();
    } else {
      console.log('Error');
    }
  }
}
