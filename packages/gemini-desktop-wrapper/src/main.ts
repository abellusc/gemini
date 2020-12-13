import electron = require('electron')
import _ from 'lodash';
// import GeminiApp from '@solsticeproject/gemini-react';
import Logger from '@solsticeproject/gemini-logging';
import sys from 'systeminformation';
import path from 'path';

const APP_NAME = 'Gemini Desktop';
const APP_VERSION = '0.1';
const app_module_package_name = '@solsticeproject/gemini-react-app'; // app to load into this context

let win: electron.BrowserWindow;

async function populateSysInfo(): Promise<any> {
    const os = await sys.osInfo();
    const gpu = await sys.graphics();
    const cpu = await sys.cpu();
    const _sysinfo = {
        platform: {
            name: os.platform, // good to know for compatibility reasons and error reporting
            version: os.release,
        },
        gpu: {
            controllers: gpu.controllers,
        }, // needs to know to send hardware info to the API to get capabilities back,
        cpu: {
            model: cpu.model,
            cores: cpu.cores,
            speed: cpu.speed,
        }
    };

    return _sysinfo;
}

electron.app.on('ready', async () => {
    const sysInfo = await populateSysInfo();

    win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        title: `${APP_NAME} v${APP_VERSION}${process.env.NODE_ENV !== 'production' ? ' [Development Mode]' : ''}`,
        webPreferences: {
            nodeIntegrationInWorker: true,
            preload: path.join(__dirname, `preload.js`)
        }
    });

    const menu = new electron.Menu();
    menu.append(new electron.MenuItem({
    label: 'test',
    submenu: [
        {
            label: 'Open Development Tools',
            role: 'help',
            accelerator: process.platform === 'darwin' ? 'Cmd+Shift+I' : 'Ctrl+Shift+I',
            enabled: (process.env.NODE_ENV !== 'production'),
            toolTip: 'Opens the CEF Debugging Panel. Only available in Developer Mode.',
            click: () => { win.webContents.isDevToolsOpened() ? win.webContents.closeDevTools() : win.webContents.openDevTools(); }
        }
    ]
    }))

    electron.Menu.setApplicationMenu(menu)

    async function tryLoad(): Promise<any>{
        Logger.debug('Attempting to load React app into electron context.');
        Logger.debug('Mode: ', process.env.NODE_ENV || 'development');
        try {
            return win.loadURL('http://localhost:63777/index.html', {
                extraHeaders: 'APP_CONTEXT=electron\n',
            }).then(() => {
                // send sysInfo over to react context so it recognizes it
                // this also triggers the app to enter its loaded state
                win.webContents.emit('redux_hydrate', sysInfo);
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