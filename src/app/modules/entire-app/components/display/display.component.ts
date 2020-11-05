import { MylistService } from './../../services/mylist.service';
import { Movie } from './../../assets/movie-template';
import { OmdbService } from './../../services/omdb.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import MockResponse from 'src/app/modules/entire-app/assets/mock-response.json';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
    @Input() inTitle: string;
    @Input() userName: string;
    movieInfo: Movie;

    constructor(
        private omdbService: OmdbService,
        private mylistservice: MylistService
    ) {}

    ngOnInit() {
        console.log(this.inTitle);
        this.getMovieInfo();
    }

    getMovieInfo() {
        this.omdbService.getMovieInfo(this.inTitle).subscribe((response) => {
            this.movieInfo = {
                title: response.Title,
                year: response.Year,
                rating: response.imdbRating,
                actors: response.Actors,
                plot: response.Plot,
                poster: response.Poster,
                genre: response.Genre,
                director: response.Director,
                runtime: response.Runtime,
                rated: response.Rated,
            };
            if (
                typeof this.movieInfo.poster === 'undefined' ||
                this.movieInfo.poster === 'N/A'
            ) {
                console.log('here');
                this.movieInfo.poster =
                    'https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/Blank-Movie-Poster1.jpg';
            }
        });
    }

    addToMyList() {
        console.log(this.inTitle);
        this.mylistservice
            .addMovie(this.movieInfo.title, this.userName)
            .subscribe((response) => {
                console.log(response);
            });
    }

    useStockPhoto() {
        console.log('hello');
        this.movieInfo.poster =
            'https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/Blank-Movie-Poster1.jpg';
    }
}
