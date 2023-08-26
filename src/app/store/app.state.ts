import { createAction, createReducer, on } from '@ngrx/store';

export interface IAppState {
  counter: number;
}


export const appInitialState: IAppState = {
  counter: 0
}

export const incrementCounter = createAction('[App] Increase Counter');
export const decrementCounter = createAction('[App] Decrease Counter');

export const appReducer =  createReducer(
  appInitialState,
  on(incrementCounter, (state) => {
    state = {
      ...state,
      counter: state.counter + 1
    }
    return state;
  }),
  on(decrementCounter, (state) => {
    state = {
      ...state,
      counter: state.counter - 1
    }
    return state;
  })
)
