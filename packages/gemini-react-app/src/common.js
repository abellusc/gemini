import ReduxUtils from '@solsticeproject/gemini-redux-utils';
import _ from 'lodash';

export function deepFilter(state, slices = [], currentKeyPath = null) {
    const obj = {};
    let keyPath = `${currentKeyPath}.` || '';

    if (!Array.isArray(slices)) {
        throw new TypeError('slices must be an array of slices to select');
    }

    for (const key in obj) {
        let isValue = null;

        keyPath += key;
        if (typeof obj[key] === 'object') {
            if (Array.isArray(obj[key])) {
                // is an array - treat as a value
                isValue = true;
            } else {
                // not an array - recursive deep slice
                isValue = false;
            }
        } else {
            // treat as value
            isValue = true;
        }

        const resolvers = [];
        if (isValue !== null) {
            if (isValue) {
                if (slices.includes(keyPath)) {
                    resolvers.push(deepFind(state, keyPath));
                }
            } else {
                Object.keys(state[key]).map((val, key) => slices.includes(`${keyPath}.${key}`) ? ({ ...val[keyPath.split('.').slice(1).join('.')] }) : undefined);
            }
        }
    }

    return obj;
}

export function deepFind(state, findPath) {
    const split = findPath.split('.');
    let obj = null;
    for (const layer of split) {
        obj = _.cloneDeep(obj ? obj[layer] : state[layer]);
    }

    return obj;
}

export function mapStateToProps(state, ownProps) { // slice is an array of slices to include
    return {
        ...ownProps,
        state
    };
}

export function mapDispatchToProps(dispatch, ownProps) {
    return {
        ...ownProps,
        dispatch,
        actions: {
            ...ReduxUtils.actions
        }
    }
}