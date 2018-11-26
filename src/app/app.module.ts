import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { BodyComponent } from './home/body/body.component';
import { SearchComponent } from './home/search/search.component';
import { UserFilmComponent } from './user-film/user-film/user-film.component';
import { UserScenarioComponent } from './user-scenario/user-scenario/user-scenario.component';
import { UserSettingComponent } from './user-setting/user-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BodyComponent,
    SearchComponent,
    UserFilmComponent,
    UserScenarioComponent,
    UserSettingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
