import { Movie } from './../assets/movie-template';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class MylistService {
    ENDPOINT = 'http://localhost:8000/mylist/';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain',
        }),
    };
    constructor(private readonly http: HttpClient) {}

    getWatchlist(userID: string) {
        const reqEndpoint = `${this.ENDPOINT}${userID}`;
        return this.http.get<any>(reqEndpoint);
    }

    getWatchlistTitle(userID: string, title: string) {
        const reqEndpoint = `${this.ENDPOINT}${userID}/${title}`;
        console.log(this.getWatchlist);
        return this.http.get<any>(reqEndpoint);
    }

    deleteMovie(movie: string, userID: string) {
        const reqEndpoint = `${this.ENDPOINT}${userID}/${movie}`;
        return this.http.delete<any>(reqEndpoint);
    }

    deleteAllMovies(userId: string) {
        const reqEndpoint = `${this.ENDPOINT}${userId}`;
        return this.http.delete<any>(reqEndpoint);
    }

    addMovie(movie: string, userID: string) {
        const reqEndpoint = `${this.ENDPOINT}${userID}`;
        return this.http.post<any>(
            reqEndpoint,
            { value: movie },
            this.httpOptions
        );
    }

    addNotes(movie: string, userID: string, notes: string) {
        const reqEndpoint = `${this.ENDPOINT}${userID}/${movie}`;
        console.log(reqEndpoint);
        return this.http.put<any>(
            reqEndpoint,
            { value: notes },
            this.httpOptions
        );
    }
}
