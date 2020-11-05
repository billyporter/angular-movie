import { Movlist } from './../../assets/movlist-interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from './../../assets/movie-template';
import { MylistService } from './../../services/mylist.service';
import { OmdbService } from './../../services/omdb.service';
import { FormControl } from '@angular/forms';
import MockResponse from 'src/app/modules/entire-app/assets/mock-response.json';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-mylist',
    templateUrl: './mylist.component.html',
    styleUrls: ['./mylist.component.scss'],
})
export class MylistComponent implements OnInit {
    @Input() inMovie: string;
    @Input() userID: string;
    @Input() movieInfo: Movie;
    @Input() inNotes: string;
    @Output() removeCurr = new EventEmitter<string>();
    myControl = new FormControl();

    constructor(
        private omdbService: OmdbService,
        private mylistservice: MylistService
    ) {}

    ngOnInit(): void {
        console.log(this.inMovie);
        console.log(this.inNotes);
        this.mylistservice
            .getWatchlist(this.userID)
            .subscribe((response) => console.log(response));
        // this.mylistservice
        //     .deleteAllMovies(this.userID)
        //     .subscribe((response) => console.log(response));
        this.getMovieInfo();
        // this.movieInfo = MockResponse;
    }

    addNotes() {
        const notesToAdd = this.myControl.value;
        this.mylistservice
            .addNotes(this.inMovie, this.userID, notesToAdd)
            .pipe(
                switchMap((resultOne) =>
                    this.mylistservice.getWatchlistTitle(
                        this.userID,
                        this.inMovie
                    )
                )
            )
            .subscribe((resultTwo) => {
                console.log(resultTwo);
                this.inNotes = resultTwo.notes;
            });
        this.myControl = new FormControl();
    }

    removeMovie() {
        this.mylistservice
            .deleteMovie(this.inMovie, this.userID)
            .subscribe((response) => {
                console.log(response);
                this.removeCurr.emit(this.inMovie);
            });
    }

    getMovieInfo() {
        this.omdbService.getMovieInfo(this.inMovie).subscribe((response) => {
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
}
