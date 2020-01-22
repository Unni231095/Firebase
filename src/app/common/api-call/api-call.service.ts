import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addUser(data) {
    this.db.database.ref('userCredentials/').push(data);
  }

  addUserDetails(data) {
    this.db.database.ref('usersDetails/').push(data);
  }

  validateUser() {
    return this.db.list('userCredentials/');
  }

  getDetails() {
    return this.db.list('usersDetails/');
  }
}
