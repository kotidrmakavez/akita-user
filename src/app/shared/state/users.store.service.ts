import { createStore, withProps, select } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { User, UserProps } from '../models/user';

// const initialState = [
//   {
//     id: 1,
//     name: 'Milos',
//     active: false,
//   },
//   {
//     id: 2,
//     name: 'Marko',
//     active: true,
//   },
// ];

const usersStore = createStore(
  { name: 'users' },
  withEntities<User>()
  // withProps<UserProps>({
  //   users: initialState,
  // })
);

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersStoreService {
  constructor() {}

  usersFromStore$ = usersStore.pipe(selectAllEntities());

  createUser(id: User['id'], name: User['name'], active: User['active']) {
    usersStore.update(addEntities({ id: id, name, active: active }));
  }
}
