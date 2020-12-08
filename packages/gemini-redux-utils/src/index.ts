import * as storesLib from './redux/stores';
import * as reducersLib from './redux/reducers';
import * as actionsLib from './redux/actions';

import { IApplicationState as AS } from './redux/IApplicationState';

interface Lib {
    storage: {
        [fnName: string]: Function;
    },
    reducers: {
        [reducerName: string]: Function;
    },
    actions: {
        [actionName: string]: Function;
    }
}

const lib: Lib = {
    storage: storesLib,
    reducers: reducersLib,
    actions: actionsLib,
};

export type IApplicationState = AS;

export default lib;
