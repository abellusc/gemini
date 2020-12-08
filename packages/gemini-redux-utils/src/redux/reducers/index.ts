import _ from 'lodash';

export interface IApplicationState {
    working_directory: string;
    install_directory: string;
    data_directory: string;
}

const initialState: IApplicationState = {
    working_directory: process.cwd(),
    install_directory: '',
    data_directory: ''
};

// Q: Why is this outside the React context?
// A: Yes.

interface IFSA {
    type: string,
    payload: {
        [key: string]: any;
    },
    error?: boolean;
}

export default function rootReducer(state = initialState, action: IFSA) {
    // Deep copy the state
    const copy = _.cloneDeep(state);

    // FSA-compliant actions are the input
    switch (action.type) {
        default: break;
    }

    return copy; // result: a new clean-break state to use with the react app
}
