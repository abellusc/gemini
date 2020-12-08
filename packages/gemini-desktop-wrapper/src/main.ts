import * as electron from 'electron';
import _ from 'lodash';
import GeminiApp from '@solsticeproject/gemini-react';
import ReduxUtils from '@solsticeproject/gemini-redux-utils';

const APP_VERSION = '0.1-dev-unstable';

const browser = new electron.BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    title: `Gemini Desktop v${APP_VERSION}`,
});

const store = ReduxUtils.getConfiguredStore(rootReducer);

electron.app.whenReady().then(() => {
    document.addEventListener('DOMContentLoaded', () => {
        GeminiApp.render(store);
    
        setTimeout(() => {
            onTick(_.cloneDeep(store.getState()));
        }, 20); // ticker manages the app's queue
    });

    browser.loadURL('http://localhost:63777', {
        extraHeaders: {
            APP_CONTEXT: 'electron'
        }
    });
});
