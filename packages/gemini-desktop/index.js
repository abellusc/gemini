import * as electron from 'electron';

import * as geminiApp from './app/src';
import * as reducers from './redux/reducers';
import * as internals from './internals';

const APP_VERSION = '0.1-dev-unstable';

const browser = new electron.BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    title: `Gemini Desktop v${APP_VERSION}`,
});

const store = getConfiguredStore(rootReducer);

document.addEventListener('DOMContentLoaded', () => {
    geminiApp.render(store);

    setTimeout(() => {
        onTick(store);
    }, 20); // ticker manages the app's queue
});
