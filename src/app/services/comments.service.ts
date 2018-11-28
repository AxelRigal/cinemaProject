import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment.models';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments: Comment[] = [];
  commentSubject = new Subject<Comment[]>();
  constructor(private httpClient: HttpClient) { }

  emitComments(){
    this.commentSubject.next(this.comments);
  }

  saveComments(){
    firebase.database().ref('/comments').set(this.comments);
  }

  getComments(){
    firebase.database().ref('/comments')
      .on('value', (data) =>{
          this.comments = data.val() ? data.val() : [];
          this.emitComments();
      });
  }

  getSingleComment(id:number){
    return new Promise(
      (resolve, reject) =>{
        firebase.database().ref('/comments/'+id).once('value').then(
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

  getCommentsFromServer(){
    this.httpClient
     .get<any[]>('https://cinema-project-dcb5f.firebaseio.com/comments.json')
     .subscribe(
       (response) =>{
           this.comments= response;
           this.emitComments();
       },
       (error)=>{
           console.log('erreur de chargement ' + error);
       }
     )
   }

  createNewComment(newComment: Comment){
    this.comments = this.comments || [];
    this.comments.push(newComment);
    this.saveComments();
    this.emitComments();
  }

  removeComment(comment: Comment){
    const commentIndexToRemove = this.comments.findIndex(
      (comEl) =>{
        if(comEl === comment){
          return true;
        }
      }
    );
    this.comments.splice(commentIndexToRemove, 1);
    this.saveComments();
    this.emitComments();
  }

  addNote(comment: Comment, note: number) {
    const commentToNote = this.comments.findIndex(
      (comEl) =>{
        if(comEl === comment){
          return true;
        }
      }
    );
    this.comments[commentToNote].note = note;
    this.saveComments();
    this.emitComments();
  }
}
