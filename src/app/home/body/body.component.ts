import { Component, OnInit, OnDestroy } from '@angular/core';
import { Film } from 'src/app/models/Film.models';
import { Comment } from 'src/app/models/Comment.models';
import { FilmsService } from 'src/app/services/films.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  films: Film[] = [];
  filmSub: Subscription;
  comments: Comment[] = [];
  commentSub: Subscription;
  userId: string;
  show: boolean = false;
  commentForm: FormGroup;
  constructor(private filmsService: FilmsService,
    private commentsService: CommentsService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.onFetch();
    this.subComments();
    this.subFilms();
    this.initForm();
    this.getUserId();
  }

  initForm() {
    this.commentForm = this.formBuilder.group({
      note: ['',Validators.minLength(1)],
      content: ['', Validators.minLength(10)]
    });
  }

  onSaveComment(id: number) {
    const note = this.commentForm.get('note').value;

    //firebase.auth().currentUser.getIdToken().then(
    //  (token: string) => token
    //);
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
           const content = this.commentForm.get('content').value;
           const filmId = this.filmsService.getFilm(id).id;
           const newComment = new Comment(content, note, filmId, user.uid); // à remplacer 0 par this.filmsService.getLastFilm()
           this.commentsService.createNewComment(newComment);
        }
      }
    );


  }

  subComments() {
    this.commentSub = this.commentsService.commentSubject.subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }
    )
    this.commentsService.getCommentsFromServer();
    this.commentsService.emitComments();
  }

  subFilms(){
     this.filmSub = this.filmsService.filmsSubject.subscribe(
      (films: Film[]) =>{
        this.films = films;
      }
    )
    this.filmsService.getFilmsFromServer();
    this.filmsService.emitFilms();
  }
  onFetch(){
    this.filmsService.getFilmsFromServer();
    this.commentsService.getCommentsFromServer();
  }

  onViewFilm(id: number) {
    this.router.navigate(['/films', 'view', id]);
  }

  ngOnDestroy(){
    this.filmSub.unsubscribe();
    this.commentSub.unsubscribe();
  }

  getUserId(){
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.userId = user.uid;
        }
      }
    )
  }

}
