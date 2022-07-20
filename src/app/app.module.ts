import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CustomSelectComponent } from './custom-elements/select-code/custom-select.component';
import { CustomValidators } from './Custom-validator/custom-validator';
import { InputCodeComponent } from './custom-elements/input-code/input-code.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginPageComponent,
    CustomSelectComponent,
    InputCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    {provide: NG_VALIDATORS, useExisting: CustomValidators},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
