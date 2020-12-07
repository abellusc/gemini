import _ from 'lodash';

export function onTick(store) {
    const currentState = _.cloneDeep(store.getState()); // read only state, for inspection purposes only

    if (!currentState) return; // skip this tick, there is no state

    const nextAction = currentState.action_queue[0];
}
