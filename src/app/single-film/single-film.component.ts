import { Component, OnInit } from '@angular/core';
import { Film } from '../models/Film.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from '../services/films.service';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.css']
})
export class SingleFilmComponent implements OnInit {
  film: Film;

  constructor(private route: ActivatedRoute,
              private filmsService: FilmsService,
              private router: Router) { }

  ngOnInit() {
    this.film = new Film(0,'','','', new Date(),'');
    const id = this.route.snapshot.params['id'];

    this.filmsService.getSingleFilm(id).then(
      (film : Film) =>{
        this.film = film;
      }
    )
  }

}
