import stores from './redux/stores';
import reducers from './redux/reducers';
import * as actions from './redux/actions';

import { IApplicationState as AS } from './redux/IApplicationState';

export default {
    stores,
    reducers,
    actions,
};

export type IApplicationState = AS;
