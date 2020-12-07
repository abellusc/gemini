import _ from 'lodash';

export function onTick(clonedState) {
    if (!clonedState) return; // skip this tick, there is no state

    const nextAction = currentState.action_queue[0];
    if (!!nextAction) {
        nextAction();
    }
}

// using this function limits one redux to one state change every tick (~20-100 ms), which limits memory usage accordingly
export function enqueueAction(actionCreator) {
    if (actionCreator && typeof actionCreator === 'function') {
        actionCreator(); // this actually triggers the action in redux - which updates the state
    }
}
