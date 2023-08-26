import { Component, Input, OnInit, Output } from '@angular/core';
import { IAppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-display-counter',
  templateUrl: './display-counter.component.html',
  styleUrls: ['./display-counter.component.scss']
})

export class DisplayCounterComponent implements OnInit{

  constructor(private store: Store<{app: IAppState}>) { }

  counter$ = this.store.select('app').pipe(
    map((state) => state.counter)
  )

  ngOnInit(): void {

  }

}
