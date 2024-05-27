import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatSectionComponent} from './pages/chat-page/chat-section/chat-section.component';
import {UsersListSectionComponent} from './pages/chat-page/users-list-section/users-list-section.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ChatPageComponent} from './pages/chat-page/chat-page.component';
import {SignOnPageComponent} from './pages/sign-on-page/sign-on-page.component';
import {MatFormField, MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    ChatSectionComponent,
    UsersListSectionComponent,
    NotFoundPageComponent,
    HomePageComponent,
    ChatPageComponent,
    SignOnPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    CdkTextareaAutosize,
    MatButton,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
