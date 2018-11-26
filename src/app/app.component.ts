import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    var config = {
      apiKey: "AIzaSyBZPS-9jm9kpB-RZOv07VLXv5mjc4LsNzA",
      authDomain: "cinema-project-dcb5f.firebaseapp.com",
      databaseURL: "https://cinema-project-dcb5f.firebaseio.com",
      projectId: "cinema-project-dcb5f",
      storageBucket: "",
      messagingSenderId: "12412106810"
    };
    firebase.initializeApp(config);
  }
}
