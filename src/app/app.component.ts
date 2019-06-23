import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.dataStorageService.getUsers();
  }

}
