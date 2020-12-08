import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';

export default function getConfiguredStore(reducer: any) {
    return createStore(reducer, promiseMiddleware);
}
