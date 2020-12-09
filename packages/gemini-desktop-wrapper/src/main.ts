import electron = require('electron');
import _ from 'lodash';
// import GeminiApp from '@solsticeproject/gemini-react';

import GeminiRedux from '@solsticeproject/gemini-redux-utils';
import * as internals from './internals';
import Logger from '@solsticeproject/gemini-logging';

const APP_NAME = 'Gemini Desktop';
const APP_VERSION = '0.1';

// the redux store is used at the electron level to orchestrate changes across contexts easier using redux state "magic"
const { rootReducer } = GeminiRedux.reducers;
const store = GeminiRedux.storage.getConfiguredStore(rootReducer);

let win: electron.BrowserWindow;

electron.app.on('ready', () => {
    win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        frame: !(process.env.NODE_ENV === 'production'),
        transparent: (process.env.NODE_ENV === 'production'),
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

    win.on('ready-to-show', () => {
        //GeminiApp.render(store);
        document.addEventListener('DOMContentLoaded', () => {
    
            setTimeout(() => {
                internals.onTick(_.cloneDeep(store.getState()), store);
            }, 20); // ticker manages the app's queue
        });

        win.loadURL(process.env.NODE_ENV === 'production' ?
        'file:./node_modules/@solsticeproject/gemini-react/dist/public/index.html'
        : 'http://localhost:63777', {
            extraHeaders: 'APP_CONTEXT=electron\n',
        }).catch((e: Error) => Logger.error(`Failed to load react app: ${e.message}`));
    });
});
