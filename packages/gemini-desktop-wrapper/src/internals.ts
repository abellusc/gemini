import _ from 'lodash';
import { AnyAction } from 'redux';
import * as utils from '@solsticeproject/gemini-redux-utils';

type ActionCreator = (() => AnyAction);
const queue: ActionCreator[] = [];

export function onTick(clonedState: IApplicationState) {
    if (!clonedState) return; // skip this tick, there is no state

    const nextAction = clonedState.action_queue[0];
    if (!!nextAction) {
        nextAction();
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
