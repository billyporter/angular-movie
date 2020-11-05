import { Movie } from './../assets/movie-template';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class OmdbService {
    BASE_URL = 'http://www.omdbapi.com/?apikey=';
    API_KEY = '897368a1';

    constructor(private readonly http: HttpClient) {}

    getMovieInfo(title: string) {
        console.log(title);
        const request = `${this.BASE_URL}${this.API_KEY}&t=${title
            .split(' ')
            .join('+')}`;
        return this.http.get<any>(request);
    }
}
