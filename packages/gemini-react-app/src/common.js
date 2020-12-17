import ReduxUtils from '@solsticeproject/gemini-redux-utils';
import _ from 'lodash';

export function deepFilterAssoc(baseObject, slices = [], currentKeyPath = null) {
    let obj = {};
    const sortedSliceArray = slices.sort((a, b) => (b - a));
    // console.log('slices to include:');
    // console.log(sortedSliceArray);

    const baseKeyPath = currentKeyPath || 'base';
    
    for (const k in baseObject) {
        // console.log(`processing -> ${k}`);
        const keyPath = baseKeyPath === 'base' ? k : `${baseKeyPath}.${k}`;
        // console.log(`key path: ${keyPath}`);
        if (typeof baseObject[k] === 'object') {
            // console.log('is object - recursive call');
            if (sortedSliceArray.includes(keyPath)) {
                obj = deepFilter(baseObject[k], slices, keyPath);
            }
        } else {
            // console.log('is normal value - check')
            if (sortedSliceArray.includes(keyPath)) {
                // console.log(`found item in list: ${o}`);
                obj = baseObject[k];
            }
        }
    }

    console.log(obj);

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