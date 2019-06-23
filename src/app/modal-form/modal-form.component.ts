import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from '../services/data-storage.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { User } from '../models/user.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  userForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [];
  user = new User();
  editMode = false;
  maxLengthAboutField = 500;

  constructor(
    public dialogRef: MatDialogRef<ModalFormComponent>,
    private dataStorageService: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.editMode = this.data.editMode;
    if (this.editMode) {
      this.user = {...this.data.user};
      this.tags = [...this.user.tags];
    }

    this.userForm = new FormGroup({
      'name': new FormControl(this.user.name, [Validators.required]),
      'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
      'balance': new FormControl(this.user.balance, [Validators.required]),
      'age': new FormControl(this.user.age, [Validators.required, this.ageValidator]),
      'picture': new FormControl(),
      'phone': new FormControl(this.user.phone, [Validators.required]),
      'address': new FormControl(this.user.address, [Validators.required]),
      'tags': new FormControl(),
      'about': new FormControl(this.user.about),
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    let user = {...this.user, ...this.userForm.value};
    user.tags = [...this.tags];

    let image: any = document.getElementById('picture');
    user.picture = image.src;

    if (this.editMode) {
      this.dataStorageService.updateUser(this.data.id, user);
    } else {
      this.dataStorageService.addUser(user);
    }

    this.dialogRef.close();
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  checkFieldState(field: string) {
    return !this.userForm.get('name').valid && this.userForm.get('name').touched;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.user.picture = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ageValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 14 || control.value > 110)) {
      return { 'ageOutOfRange': true };
    }
    return null;
  }

}
