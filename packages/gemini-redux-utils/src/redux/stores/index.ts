import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';

export function getConfiguredStore(reducer: any) {
    return createStore(reducer, applyMiddleware(promiseMiddleware));
}
