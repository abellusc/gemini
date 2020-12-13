import _ from 'lodash';
import { IApplicationState } from 'src';
import { SupportedFeature } from '../IApplicationState';
import { IFSA } from '../IFSA';

import { createReducer } from '@reduxjs/toolkit';

import * as features from  './features';

import * as util from '../util';

import * as actions from '../actions';

const initialState: IApplicationState = {
    _loaded: false,
    app: {
        feature_tab: SupportedFeature.DEFAULT,
        features_available: [
            'Dashboard',
            'Configure',
            'Deploy',
            'Optimize',
            'Validate'
        ],
        current_url: '/dashboard',
        errors: []
    },
    sys: null,
};

export function rootReducer(state: IApplicationState = initialState, action: IFSA<any>): IApplicationState {
    const clone = _.cloneDeep(state);
    console.log(`Received action:`, action.type);

    switch(action.type) {
        case 'HYDRATE_FROM_SYSTEM':
            clone.sys = action.payload.sysInfo;
            clone._loaded = true;
            break;
        case 'SET_FEATURE_TAB':
            clone.app.feature_tab = features.setFeatureTab(state.app.feature_tab, action.payload.featureTab);
            break;
        case 'THROW_ERROR':
            clone.app.errors = [
                ...clone.app.errors,
            ];

            clone.app.errors.push(action.payload);
            break;
        default:
            console.error('unknown action - no handler found.');
            break;
    }

    console.log('done');

    return clone;
}
