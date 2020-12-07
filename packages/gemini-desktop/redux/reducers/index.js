import _ from 'lodash';

const initialState = {
    working_directory: process.cwd(),
    install_directory: '',
    data_directory: '',
    action_queue: [], // this holds the actions which are being processed by the electron side
};

// Q: Why is this outside the React context?
// A: Yes.

export default function rootReducer(state = initialState, action) {
    // Deep copy the state
    const copy = _.cloneDeep(state);

    // FSA-compliant actions are the input
    switch (action.type) {
        default: break;
    }

    return copy; // result: a new clean-break state to use with the react app
}
