import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user;
  userChangedSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const userId = params.id;

      if (!this.dataStorageService.isUsersEmpty()) {
        this.user = this.dataStorageService.getUser(userId);
      }
      this.userChangedSubscription = this.dataStorageService.userChanged.subscribe((users: []) => {
        this.user = this.dataStorageService.getUser(userId);
      });
    });
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe();
  }

}
