import _ from 'lodash';
import { IApplicationState } from 'src';
import { SupportedFeature } from '../IApplicationState';
import { IFSA } from '../IFSA';

// @ts-ignore
import { createReducer } from '@reduxjs/toolkit';

import * as features from  './features';

import * as util from '../util';

const initialState: IApplicationState = {
    config: {
        working_directory: process.cwd(),
        install_directory: '',
        data_directory: ''
    },
    app: {
        feature_tab: SupportedFeature.DEFAULT,
        features_available: [
            'Dashboard',
            'Configure',
            'Deploy',
            'Optimize',
            'Validate'
        ],
    }
};

export const rootReducer = createReducer()
