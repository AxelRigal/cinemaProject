import { Injectable } from '@angular/core';
import { Film } from '../models/Film.models';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  films: Film[] = [];
  filmsSubject = new Subject<Film[]>();
  constructor(private httpClient: HttpClient) { }

  emitFilms(){
    this.filmsSubject.next(this.films);
  }

  saveFilms(){
   firebase.database().ref('/films').set(this.films);
  }
  /*saveFilms(){
    this.httpClient
      .put('https://cinema-project-dcb5f.firebaseio.com/', this.films)
      .subscribe(
        () => {
          console.log('enregistrement terminé')
        },
        (error) => {
          console.log('erreur de sauvegarde : ' + error);
        }
      )
  } */
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

  getFilmsFromServer(){
    this.httpClient
     .get<any[]>('https://cinema-project-dcb5f.firebaseio.com/films.json')
     .subscribe(
       (response) =>{
           this.films= response;
           this.emitFilms();
       },
       (error)=>{
           console.log('erreur de chargement ' + error);
       }
     )
   }

  getLastFilm()
  {
    return this.films.length;
  }

  createNewFilm(newFilm: Film){
    this.films.push(newFilm);
    this.saveFilms();
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

  getFilm(id : number){
    return this.films[id];
  }
}
