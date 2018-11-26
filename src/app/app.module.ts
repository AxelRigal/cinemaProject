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
import { AuthService } from './services/auth.service';
import { FilmsService } from './services/films.service';
import { CommentsService } from './services/comments.service';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  HttpClientModule  } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent  },
  { path: 'auth/signin', component: SigninComponent  },
  { path: 'user-film', component: UserFilmComponent  },
  { path: 'user-scenario', component: UserScenarioComponent  },
  { path: 'home', component: HomeComponent }
  
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BodyComponent,
    SearchComponent,
    UserFilmComponent,
    UserScenarioComponent,
    UserSettingComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    FilmsService,
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
