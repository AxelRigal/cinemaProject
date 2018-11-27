import { Injectable } from '@angular/core';
import { Film } from '../models/Film.models';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  films: Film[] = [];
  filmsSubject = new Subject<Film[]>();
  constructor() { }

  emitFilms(){
    this.filmsSubject.next(this.films);
  }

  saveFilms(){
    firebase.database().ref('/films').set(this.films);
  }

  getFilms(){
    firebase.database().ref('/films')
      .on('value', (data) =>{
          this.films = data.val() ? data.val() : [];
          this.emitFilms();
      });
  }


  getSingleFilm(id:number){
    return new Promise(
      (resolve, reject) =>{
        firebase.database().ref('/films/'+id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  getLastFilm()
  { // a developper 
    return this.films.lastIndexOf;
  }

  createNewFilm(newFilm: Film){
    this.films.push(newFilm);
    this.emitFilms();
  }

  removeFilm(film: Film){
    const filmIndexToRemove = this.films.findIndex(
      (filmEl) =>{
        if(filmEl === film){
          return true;
        }
      }
    );
    this.films.splice(filmIndexToRemove, 1);
    this.saveFilms();
    this.emitFilms();
  }
}
