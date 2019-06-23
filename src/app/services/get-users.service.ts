import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<User[]>('assets/users.json');
  }
}
