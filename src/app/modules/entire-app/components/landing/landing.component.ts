import { Movlist } from './../../assets/movlist-interface';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MovieFetcher } from '../../services/movie-fetcher.service';
import { MylistService } from './../../services/mylist.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    fields = ['Actor', 'Director', 'Genre'];
    formFieldsInfo = new Map();
    movieTitles: string[];
    myControl = new FormControl('', Validators.required);
    allowScroll = 0;
    allowSup = 1;
    userName: string;
    onRecView = 1;
    myMovies: Movlist[] = [];
    scollTimeout: any;

    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event) {
        clearTimeout(this.scollTimeout);
        this.scollTimeout = setTimeout(() => {
            this.allowSup = 0;
        }, 100);
    }

    constructor(
        private moviesService: MovieFetcher,
        private listfetcher: MylistService
    ) {}

    ngOnInit() {}

    scroll() {
        const el = document.getElementsByClassName('sup')[0];
        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
        });
    }

    checkToScroll() {
        if (this.myControl.valid) {
            this.allowScroll = 1;
            this.scroll();
            this.userName = this.myControl.value;
        }
    }

    updateInfo(field: string, content: string) {
        this.formFieldsInfo.set(field, content);
    }

    toRecView() {
        this.onRecView = 1;
    }

    toListView() {
        this.onRecView = 0;
        this.getMyList();
    }

    getMyList() {
        this.listfetcher.getWatchlist(this.userName).subscribe((response) => {
            this.myMovies = response.titles;
        });
    }

    removeMovie(title: string) {
        let indToRemove = 0;
        let i = 0;
        for (const mov of this.myMovies) {
            if (mov.title === title) {
                indToRemove = i;
                break;
            }
            i += 1;
        }
        this.myMovies.splice(indToRemove, 1);
    }

    sortMovieMap(movieMap: Map<string, number>) {
        const movieArray: string[][] = [];
        for (const [key, value] of movieMap) {
            movieArray.push([key, value.toString()]);
        }
        movieArray.sort(this.customSortFunction);
        const oneD: string[] = [];

        movieArray.map((movie) => {
            oneD.push(movie[0]);
        });
        this.movieTitles = oneD.slice(0, 10);
    }

    customSortFunction(a: string[], b: string[]) {
        if (a[1] === b[1]) {
            return 0;
        } else {
            return a[1] < b[1] ? 1 : -1;
        }
    }

    getMovieList() {
        const moviesMap = new Map();
        for (const [key, value] of this.formFieldsInfo) {
            switch (key) {
                case 'Actor': {
                    this.moviesService
                        .getMovieByActor(value)
                        .subscribe((movies) => {
                            for (const movie of movies.value) {
                                if (moviesMap.has(movie)) {
                                    moviesMap.set(
                                        movie,
                                        moviesMap.get(movie) + 1
                                    );
                                } else {
                                    moviesMap.set(movie, 0);
                                }
                            }
                            this.sortMovieMap(moviesMap);
                        });
                    break;
                }
                case 'Director': {
                    this.moviesService
                        .getMovieByDirector(value)
                        .subscribe((movies) => {
                            for (const movie of movies.value) {
                                if (moviesMap.has(movie)) {
                                    moviesMap.set(
                                        movie,
                                        moviesMap.get(movie) + 1
                                    );
                                } else {
                                    moviesMap.set(movie, 0);
                                }
                            }
                            this.sortMovieMap(moviesMap);
                        });
                    break;
                }
                case 'Genre': {
                    this.moviesService
                        .getMovieByGenre(value)
                        .subscribe((movies) => {
                            for (const movie of movies.value) {
                                if (moviesMap.has(movie)) {
                                    moviesMap.set(
                                        movie,
                                        moviesMap.get(movie) + 1
                                    );
                                } else {
                                    moviesMap.set(movie, 0);
                                }
                            }
                            this.sortMovieMap(moviesMap);
                        });
                    break;
                }
            }
        }
    }
}
