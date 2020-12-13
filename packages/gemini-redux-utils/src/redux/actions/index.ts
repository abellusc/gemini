import { createAction } from 'redux-actions';
import { IFSA } from '../IFSA';

export const setFeatureTab = createAction<IFSA>('SET_FEATURE_TAB');