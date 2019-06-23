import { Injectable } from '@angular/core';
import { GetUsersService } from './get-users.service';

import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  users = [];
  userChanged = new Subject<any>();

  constructor(
    private getUsersService: GetUsersService,
    private sanitizer: DomSanitizer
  ) { }

  addUser(user) {
    user.registered = moment.utc().local().format();
    user.picture = this.sanitize(user.picture);

    this.users.push(user);
    this.userChanged.next(this.users.slice());
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.userChanged.next(this.users.slice());
  }

  updateUser(index: number, user) {
    this.users[index] = user;
    this.userChanged.next(this.users.slice());
  }

  getUser(index: number) {
    return this.users[index];
  }

  isUsersEmpty() {
    return this.users.length === 0;
  }

  sliceUsers() {
    if (!this.isUsersEmpty()) {
      return this.users.slice();
    }
  }

  getUsers() {
    this.getUsersService.getUsers().subscribe((users: []) => {
        this.users = users.map((user: any) => {
          user.picture = this.sanitizer.bypassSecurityTrustResourceUrl(user.picture);
          return user;
        });

        this.userChanged.next(this.users.slice());
    });
  }

  sanitize(value) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
