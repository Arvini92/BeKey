import { Component, OnInit, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { DataStorageService } from '../services/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users;
  userChangedSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.users = this.dataStorageService.sliceUsers();
    this.userChangedSubscription = this.dataStorageService.userChanged.subscribe((users: []) => {
      this.users = users;
    });
  }

  onUserDeleted(event) {
    this.dataStorageService.deleteUser(event.id);
  }

  onUserEdited(event) {
    const user = this.dataStorageService.getUser(event.id);
    this.openDialog(user, true, event.id);
  }


  openDialog(user = {}, editMode = false, id?: number) {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      data: {user, editMode, id}
    });
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe();
  }
}
