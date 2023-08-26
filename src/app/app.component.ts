import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, decrementCounter, incrementCounter } from './store/app.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-tutorial';

  constructor(private store: Store<{app: IAppState}>) {

  }
  counter$ =  this.store.select('app').pipe(
    map((state) => state.counter)
  );

  increment() {
    this.store.dispatch(incrementCounter());
  }

  decrement() {
    this.store.dispatch(decrementCounter());
  }
}
