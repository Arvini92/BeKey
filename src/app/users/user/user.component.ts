import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user;
  @Input() index;
  @Output() userDeleted = new EventEmitter<{id: number}>();
  @Output() userEdited = new EventEmitter<{id: number}>();

  constructor() { }

  ngOnInit() {}

  onDelete() {
    this.userDeleted.emit({id: this.index});
  }

  onEdit() {
    this.userEdited.emit({id: this.index});
  }

}
