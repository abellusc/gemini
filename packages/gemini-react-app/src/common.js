import ReduxUtils from '@solsticeproject/gemini-redux-utils';

export function deepFilterAssoc(baseObject, slices = [], currentKeyPath = null) {
    let obj = {};
    Object.seal(baseObject);
    const sortedSliceArray = slices.sort((a, b) => (b - a));
    // console.log('slices to include:');
    // console.log(sortedSliceArray);

    const baseKeyPath = currentKeyPath || 'base';

    let i = 0;
    for (const k in baseObject) {
        // console.log(`processing -> ${k}`);
        const keyPath = baseKeyPath === 'base' ? k : `${baseKeyPath}.${k}`;
        // console.log(`key path: ${keyPath}`);
        if (typeof baseObject[k] === 'object') {
            // console.log('is object - recursive call');
            if (sortedSliceArray.includes(keyPath)) {
                // exclude this instruction so it doesn't run again
                const before = sortedSliceArray.splice(0, i - 1);
                const after = sortedSliceArray.splice(i + 1);
                obj = deepFilterAssoc(baseObject[k], before.concat(...after), keyPath);
            } else if (sortedSliceArray.includes(keyPath.split('.').includes(k) && keyPath.split('.').concat([k]).join('.'))) {
                obj = baseObject[k];
            }
        } else {
            // console.log('is normal value - check')
            if (sortedSliceArray.includes(keyPath)) {
                // console.log(`found item in list: ${o}`);
                obj = baseObject[k];
            }
            // fall through: obj resolves to empty object since associative paths resolved into empty
        }
        i++;
    }

    return obj;
}

export function mapStateToProps(state, ownProps) { // slice is an array of slices to include
    return {
        self: ownProps,
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

export function mapStateToPropsAdv(state, ownProps, template) {
    const baseProps = mapStateToProps(state, ownProps);
    // destructure to extract desired values
    function _r(obj) {
        const out = {};
        Object.keys(obj).forEach((key) => {
            const val = obj[key];

            if (typeof val === 'object') {
                if (Array.isArray(val) && !!template[key]) {
                    out[key] = val;
                } else if (!!template[key]) {
                    out[key] = _r(val);
                }
            } else {
                if (!!template[key]) {
                    out[key] = val;
                }
            }
        });

        return out;
    }

    const r = _r(baseProps);

    // reconstruct into an object
    const stateSliced = {
        self: {
            ...Object.keys(template).map((k) => r.self[k]),
        },
        state: {
            ...Object.keys(template).map((k) => r.state[k]),
        }
    };

    Object.seal(stateSliced);
    return stateSliced;
}
