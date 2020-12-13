import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { rootReducer } from '../reducers';

export function getConfiguredStore(reducer: any = rootReducer) {
    return createStore(reducer, applyMiddleware(promiseMiddleware));
}
