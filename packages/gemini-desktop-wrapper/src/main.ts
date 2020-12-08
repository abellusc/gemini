import * as electron from 'electron';
import _ from 'lodash';
// import GeminiApp from '@solsticeproject/gemini-react';
// @ts-ignore
import ReduxUtils from '@solsticeproject/gemini-redux-utils';
import * as internals from './internals';

const APP_VERSION = '0.1-dev-unstable';

const browser = new electron.BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    title: `Gemini Desktop v${APP_VERSION}`,
});

const store = ReduxUtils.getConfiguredStore(ReduxUtils.rootReducer);

electron.app.whenReady().then(() => {
    document.addEventListener('DOMContentLoaded', () => {
        //GeminiApp.render(store);
    
        setTimeout(() => {
            internals.onTick(_.cloneDeep(store.getState()), store);
        }, 20); // ticker manages the app's queue
    });

    browser.loadURL(process.env.NODE_ENV === 'production' ?
        'file:./node_modules/@solsticeproject/gemini-react/dist/public/index.html'
        : 'http://localhost:63777', {
            extraHeaders: 'APP_CONTEXT=electron\n',
        });
});
