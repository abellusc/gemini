import * as electron from 'electron';
import _ from 'lodash';
// import GeminiApp from '@solsticeproject/gemini-react';

import GeminiRedux from '@solsticeproject/gemini-redux-utils';
import * as internals from './internals';
import Logger from '@solsticeproject/gemini-logging';

const APP_NAME = 'Gemini Desktop';
const APP_VERSION = '0.1';
const app_module_package_name = '@solsticeproject/gemini-react-app'; // app to load into this context

// the redux store is used at the electron level to orchestrate changes across contexts easier using redux state "magic"
const { rootReducer } = GeminiRedux.reducers;
const store = GeminiRedux.storage.getConfiguredStore(rootReducer);

let win: electron.BrowserWindow;

electron.app.on('ready', () => {
    win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        frame: !(process.env.NODE_ENV === 'production'),
        title: `${APP_NAME} v${APP_VERSION}${process.env.NODE_ENV !== 'production' ? ' [Development Mode]' : ''}`,
    });

    const menu = new electron.Menu()
    menu.append(new electron.MenuItem({
    label: APP_NAME,
    submenu: [{
        label: 'Open Dev Tools',
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        click: () => { win.webContents.openDevTools(); }
    }]
    }))

    electron.Menu.setApplicationMenu(menu)

    async function tryLoad(): Promise<any>{
        Logger.debug('Attempting to load React app into electron context.');
        Logger.debug('Mode: ', process.env.NODE_ENV || 'development');
        try {
            return win.loadURL('http://localhost:63777/index.html', {
                extraHeaders: 'APP_CONTEXT=electron\n',
            })
        } catch (e: any) {
            throw e;
        }
    }

    function recursiveTry() {
        tryLoad()
        .then(() => {
            Logger.info('SUCCESS React app has been loaded into electron context.');
        })
        .catch(() => {
            Logger.error('React app could not be loaded, trying in 5 seconds...');
            setTimeout(() => {
                recursiveTry();
            });
        }); // keep trying to load
    }

    recursiveTry();
});
