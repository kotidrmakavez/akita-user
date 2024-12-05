import { createStore, withProps, select } from '@ngneat/elf';
import {
  addEntities,
  getEntitiesCount,
  getEntityByPredicate,
  selectAllEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { User, UserProps } from '../models/user';

const initialState = [
  {
    id: 1,
    name: 'Milos',
    active: false,
  },
  {
    id: 2,
    name: 'Marko',
    active: true,
  },
];

const usersStore = createStore(
  { name: 'users' },
  withEntities<User>({
    initialValue: initialState,
  })
);

import { Injectable } from '@angular/core';
import { delay, Observable, of, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersStoreService {
  constructor() {}

  usersFromStore$ = usersStore.pipe(selectAllEntities());

  count = usersStore.query(getEntitiesCount());

  active = usersStore.query(
    getEntityByPredicate(({ active }) => active === false)
  );

  createUser(id: User['id'], name: User['name'], active: User['active']) {
    usersStore.update(addEntities({ id: id, name, active: active }));
  }

  checkIfNameAlreadyExists(username: User['name']): Observable<boolean> {
    const nameExists = usersStore.query(
      getEntityByPredicate(({ name }) => name === username)
    );

    if (nameExists) {
      return of(true).pipe(delay(2000));
    } else {
      return of(false).pipe(delay(2000));
    }
  }
}
