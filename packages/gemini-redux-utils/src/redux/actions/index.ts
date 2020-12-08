import { createAction } from 'redux-actions';

import * as test from './test';

export const testAction = createAction('TEST_ACTION', test.testAction);
