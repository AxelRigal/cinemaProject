import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmsService } from '../services/films.service';
import { Film } from '../models/Film.models';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-film',
  templateUrl: './user-film.component.html',
  styleUrls: ['./user-film.component.css']
})
export class UserFilmComponent implements OnInit {
  filmForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private filmsService: FilmsService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.filmForm = this.formBuilder.group({
      name: ['', Validators.required],
      realisator: ['', Validators.required],
      date: ['', Validators.required],
      synopsisLong: ['', Validators.required]
    });
  }

  onSaveFilm() {
    const name = this.filmForm.get('name').value;
    const realisator = this.filmForm.get('realisator').value;
    const date = this.filmForm.get('date').value;
    const synopsisLong = this.filmForm.get ('synopsisLong').value;
    const id = this.filmsService.getLastFilm();
    const newFilm = new Film(0, name, '', synopsisLong, date, realisator); // à remplacer 0 par this.filmsService.getLastFilm()
    this.filmsService.createNewFilm(newFilm);
    this.router.navigate(['/home']);
  }
}
