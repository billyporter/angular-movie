import { Injectable } from '@angular/core';
import Actors from '../assets/actors.json';
import Directors from '../assets/directors.json';
import Genres from '../assets/genre.json';
import Countries from '../assets/country.json';
import Years from '../assets/year.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieFetcher {
  constructor(private readonly http: HttpClient) {}

  getRequestedInfo(field: string) {
    let info: any;
    if (field === 'Actor') {
      info = Actors;
    }
    if (field === 'Director') {
      info = Directors;
    }
    if (field === 'Genre') {
      info = Genres;
    }
    if (field === 'Country') {
      info = Countries;
    }
    if (field === 'Year') {
      info = Years;
    }
    const infoList: string[] = [];
    for (const cast of Object.keys(info)) {
      const infoIndiv = cast.split(',').map((actor) => actor.trim());
      infoList.push(...infoIndiv);
    }
    return [...new Set(infoList)];
  }

  getMovieByActor(actor: string) {
    const endpoint = `http://localhost:8000/netflix/actor/${actor}`;
    return this.http.get<any>(endpoint);
  }

  getMovieByDirector(director: string) {
    const endpoint = `http://localhost:8000/netflix/director/${director}`;
    return this.http.get<any>(endpoint);
  }

  getMovieByGenre(genre: string) {
    const endpoint = `http://localhost:8000/netflix/genre/${genre}`;
    return this.http.get<any>(endpoint);
  }
}
