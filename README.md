# NgRx Readme

This README provides a brief overview of how to use NgRx in an Angular application using the `on()`, `createAction`, `.select()`, `.pipe()`, and `map()` operators. NgRx is a state management library for Angular applications that follows the Redux pattern.

## Table of Contents
- [Introduction to NgRx](#introduction-to-ngrx)
- [Getting Started](#getting-started)
- [Actions](#actions)
- [Reducers](#reducers)
- [Selectors](#selectors)
- [Effects](#effects)
- [Example Usage](#example-usage)
- [Additional Resources](#additional-resources)

## Introduction to NgRx

NgRx is a powerful state management library that helps manage application state in a predictable manner. It is especially useful for larger applications with complex data flows and interactions. NgRx follows a unidirectional data flow and is based on three core principles: **Actions**, **Reducers**, and **Selectors**.

### Getting Started

To get started with NgRx, make sure you have an Angular project set up. You can install NgRx using the following command:

```bash
ng add @ngrx/store
```

This will install the necessary dependencies and set up NgRx in your project.

## Actions

Actions are simple objects that describe something that happened in your application. They are dispatched by components or services to trigger state changes. In NgRx, we use the `createAction` function to define actions.

```typescript
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
```

## Reducers

Reducers specify how the application's state changes in response to actions. Reducers are pure functions that take the current state and an action as arguments, and return a new state.

```typescript
import { createReducer, on } from '@ngrx/store';
import { increment, decrement } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1)
);
```

## Selectors

Selectors are functions that retrieve specific pieces of state from the store. They help to decouple the components from the structure of the store.

```typescript
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectCounter = (state: AppState) => state.counter;

export const selectCount = createSelector(
  selectCounter,
  counter => counter
);
```

## Effects

Effects are used to manage side effects, such as fetching data from an API or interacting with the browser's storage. They listen for dispatched actions, perform some asynchronous operation, and then dispatch new actions in response.

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { DataService } from './data.service';
import * as fromDataActions from './data.actions';

@Injectable()
export class DataEffects {

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDataActions.loadRequest),
      mergeMap(() =>
        this.dataService.getData().pipe(
          map(data => fromDataActions.loadSuccess({ data })),
          catchError(error => of(fromDataActions.loadFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
```

## Example Usage

Assuming you have a counter feature in your state and you want to use it in a component:

```typescript
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement } from './counter.actions';
import { selectCount } from './selectors';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <button (click)="increment()">Increment</button>
      <span>{{ count$ | async }}</span>
      <button (click)="decrement()">Decrement</button>
    </div>
  `,
})
export class CounterComponent {
  count$ = this.store.select(selectCount);

  constructor(private store: Store) {}

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
}
```

## Additional Resources

- [NgRx Documentation](https://ngrx.io/docs)
- [NgRx GitHub Repository](https://github.com/ngrx/platform)
- [Angular Official Documentation](https://angular.io/docs)

Feel free to explore these resources for more in-depth information about NgRx and its capabilities.
