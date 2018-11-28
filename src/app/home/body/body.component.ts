import { Component, OnInit, OnDestroy } from '@angular/core';
import { Film } from 'src/app/models/Film.models';
import { Comment } from 'src/app/models/Comment.models';
import { FilmsService } from 'src/app/services/films.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private filmsService: FilmsService,
    private commentsService: CommentsService,
    private router: Router) { }

  ngOnInit() {
    this.onFetch();
    this.subComments();
    this.subFilms();
  }

  subComments() {
    this.commentSub = this.commentsService.commentSubject.subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }
    );
    this.commentsService.emitComments();
  }

  subFilms() {
     this.filmSub = this.filmsService.filmsSubject.subscribe(
      (films: Film[]) => {
        this.films = films;
      }
    );
    this.filmsService.getFilmsFromServer();
    this.filmsService.emitFilms();
  }
  onFetch() {
    this.filmsService.getFilmsFromServer();
  }

  onViewFilm(id: number) {
    this.router.navigate(['/films', 'view', id]);
  }

  ngOnDestroy() {
    this.filmSub.unsubscribe();
    this.commentSub.unsubscribe();
  }
}
