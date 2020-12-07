import { createStore } from 'redux';
import promiseMiddleware from 'redux-promise';

export default function getConfiguredStore(reducer) {
    const store = createStore(reducer);
    store.applyMiddleware(promiseMiddleware);

    return store;
}