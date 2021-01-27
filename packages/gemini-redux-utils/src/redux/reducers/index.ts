import _ from 'lodash';
import { IApplicationState } from 'src';
import { SupportedFeature } from '../IApplicationState';
import { IFSA } from '../IFSA';

import * as features from  './features';


const startArr: number[] = [];
startArr.fill(0.0,0,0)

const initialState: IApplicationState = {
    _loaded: false,
    app: {
        common: {
            feature_tab: SupportedFeature.DEFAULT,
            features_available: [
                'Dashboard',
                'Configure',
                'Deploy',
                'Optimize',
                'Validate'
            ],
            current_url: '/dashboard',
            errors: [],
        },
        sys_info: {
            cpu: {
                temp: {
                    main: null
                },
                load: -1.00,
                load_history: [],
            }
        }
    },
    sys: null,
};

const HISTORY_SIZE = 100;

export function rootReducer(state: IApplicationState = initialState, action: IFSA<any>): IApplicationState {
    const clone = _.cloneDeep(state);
    console.log(`Received action:`, action.type);

    switch(action.type) {
        case 'HYDRATE_FROM_SYSTEM':
            clone.sys = action.payload.sysInfo;
            clone._loaded = true;
            break;
        case 'SET_FEATURE_TAB':
            clone.app.common.feature_tab = features.setFeatureTab(state.app.common.feature_tab, action.payload.featureTab);
            break;
        case 'THROW_ERROR':
            clone.app.common.errors = [ ...(clone.app.common.errors || []) ];
            clone.app.common.errors.push(action.payload);
            break;
        case 'SET_SYSTEM_STATUS':
            clone.app.sys_info.cpu.temp = action.payload.temp;
            clone.app.sys_info.cpu.load = action.payload.load;
            let history = _.cloneDeep(clone.app.sys_info.cpu.load_history);
            history.unshift(parseFloat(parseFloat(action.payload.load.currentload).toFixed(2)));
            history = history.slice(0, (HISTORY_SIZE - 1)); // constrain the history to this amount
            clone.app.sys_info.cpu.load_history = history;
            break;
        default:
            console.error('unknown action - no handler found.');
            break;
    }

    console.log('done');

    console.log('new state');
    console.log(clone);

    return clone;
}
