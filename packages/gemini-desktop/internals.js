import _ from 'lodash';

export function onTick(store) {
    const currentState = _.cloneDeep(store.getState()); // read only state, for inspection purposes only

    
}
