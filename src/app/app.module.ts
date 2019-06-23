import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ConvertTimePipe } from './pipes/convert-time.pipe';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ModalFormComponent,
    UsersComponent,
    UserComponent,
    ConvertTimePipe,
    UserDetailsComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [ModalFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
