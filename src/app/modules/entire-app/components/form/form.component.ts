import { MovieFetcher } from './../../services/movie-fetcher.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface InfoChange {
  field: string;
  content: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formInfo!: string;
  @Output() infoChange = new EventEmitter<InfoChange>();
  actorsOptions: string[] = [];
  myControl = new FormControl();
  filteredActors: Observable<string[]>;

  constructor(private moviesService: MovieFetcher) {}

  ngOnInit(): void {
    this.getAllActors();
    this.filteredActors = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.myControl.valueChanges.subscribe((newValue) => {
      this.infoChange.emit({ field: this.formInfo, content: newValue });
    });
  }

  getAllActors(): void {
    this.actorsOptions = this.moviesService.getRequestedInfo(this.formInfo);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let returnValue = this.actorsOptions.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
    returnValue.sort();
    returnValue = returnValue.slice(0, 10);
    return returnValue;
  }
}
