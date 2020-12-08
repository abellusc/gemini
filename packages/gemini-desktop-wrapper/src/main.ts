import * as electron from 'electron';
import _ from 'lodash';
// import GeminiApp from '@solsticeproject/gemini-react';
// @ts-ignore
import GeminiRedux from '@solsticeproject/gemini-redux-utils';
import * as internals from './internals';

const APP_VERSION = '0.1-dev-unstable';

const browser = new electron.BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    title: `Gemini Desktop v${APP_VERSION}`,
});

// the redux store is used at the electron level to orchestrate changes across contexts easier using redux state "magic"
const { rootReducer } = GeminiRedux.reducers;
const store = GeminiRedux.storage.getConfiguredStore(rootReducer);

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
