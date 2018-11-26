import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonPremierComponent } from './home/mon-premier/mon-premier.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { BodyComponent } from './home/body/body.component';
import { SearchComponent } from './home/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    HomeComponent,
    LoginComponent,
    BodyComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
