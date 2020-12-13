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

export const rootReducer = createReducer(initialState, {
    ['HYDRATE_FROM_SYSTEM']: (state, action) => {
        const clone = _.cloneDeep(state);
        clone.sys = features.hydrateFromSystem(action.payload.sysInfo);
        return clone;
    },
    ['SET_FEATURE_TAB']: (state, action) => {
        const clone = _.cloneDeep(state);
        clone.app.feature_tab = features.setFeatureTab(state.app.feature_tab, action.payload.featureTab);
        return clone;
    }
});
