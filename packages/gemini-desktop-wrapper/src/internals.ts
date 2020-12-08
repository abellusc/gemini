import _ from 'lodash';
import { AnyAction } from 'redux';
import utils from '@solsticeproject/gemini-redux-utils';
import { IApplicationState } from '@solsticeproject/gemini-redux-utils';

type ActionCreator = (() => AnyAction);
const queue: ActionCreator[] = [];

// ticks every 20 ms to pump along the custom event loop
export function onTick(clonedState: IApplicationState, store?: any) {
    if (!clonedState) return; // skip this tick, there is no state

    const nextAction = queue.shift();
    if (!!nextAction) {
        store.dispatch(async () => await nextAction()); // calling the nextAction fn creates the action in redux so it can be processed cleanly
    }
}

// using this function limits one redux to one state change every tick (~20-100 ms), which limits memory usage accordingly
export function enqueueAction(actionCreator: () => AnyAction): ActionCreator[] | null {
    if (actionCreator && typeof actionCreator === 'function') {
        return [
            ...queue,
        ]
    }

    return null;
}
