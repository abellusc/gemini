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
        current_url: '/dashboard'
    },
    sys: {
        platform: {
            name: '',
            version: ''
        },
        gpu: {
            controllers: [],
        },
        cpu: {
            model: '',
            cores: 0,
            speed: ''
        }
    }
};

export function rootReducer(state: IApplicationState = initialState, action: IFSA) {
    const clone = _.cloneDeep(state);
    console.log(`Received action:`, action.type);

    switch(action.type) {
        case 'HYDRATE_FROM_SYSTEM':
            clone.sys = features.hydrateFromSystem(action.payload.sysInfo);
            break;
        case 'SET_FEATURE_TAB':
            clone.app.feature_tab = features.setFeatureTab(state.app.feature_tab, action.payload.featureTab);
            break;
        default:
            console.error('unknown action - no handler found.');
            break;
    }

    console.log('done');

    return clone;
}
