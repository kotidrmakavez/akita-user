import { createStore } from '@ngneat/elf';
import {
  addEntities,
  getEntitiesCount,
  getEntityByPredicate,
  selectAllEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { User } from '../models/user';
import { joinRequestResult } from '@ngneat/elf-requests';

const initialState = [
  {
    id: 1,
    name: 'Milos',
    active: true,
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
import { delay, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersStoreService {
  constructor() {}

  usersFromStore$ = usersStore.pipe(selectAllEntities());

  disabledAddUserButton$ = usersStore.pipe(
    selectAllEntities(),
    map((users) => ({
      allActive: users.every((user) => user.active),
      userCount: users.length,
    })),
    map(({ allActive, userCount }) => {
      if (allActive && userCount < 5) {
        return true;
      } else {
        return false;
      }
    })
  );

  count = usersStore.query(getEntitiesCount());

  active = usersStore.query(getEntityByPredicate(({ active }) => !active));

  createUser(id: User['id'], name: User['name'], active: User['active']) {
    usersStore.update(addEntities({ id: id, name, active: active }));
  }

  checkIfNameAlreadyExists(username: User['name']): Observable<boolean> {
    const nameExists = usersStore.query(
      getEntityByPredicate(({ name }) => name === username)
    );

    if (nameExists) {
      return of(true).pipe(delay(1000));
    } else {
      return of(false).pipe(delay(1000));
    }
  }
}
