import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment.models';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: Comment[] = [];
  commentSubject = new Subject<Comment[]>();
  constructor() { }

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
  createNewComment(newComment: Comment){
    this.comments.push(newComment);
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
}
