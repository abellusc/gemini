import electron = require('electron')
import _ from 'lodash';
// import GeminiApp from '@solsticeproject/gemini-react';
import Logger from '@solsticeproject/gemini-logging';
import path from 'path';
import { ISystemInformation } from '@solsticeproject/gemini-redux-utils/dist/redux/IApplicationState';
import sys from 'systeminformation';

const APP_NAME = 'Gemini Desktop';
const APP_VERSION = '0.1';
const app_module_package_name = '@solsticeproject/gemini-react-app'; // app to load into this context

let win: electron.BrowserWindow;

async function getSystemInformation(): Promise<ISystemInformation> {
    const [ os, gpu, cpu ] = await Promise.all([
        sys.osInfo(),
        sys.graphics(),
        sys.cpu()
    ]);

    return {
        platform: {
            name: os.platform, // good to know for compatibility reasons and error reporting
            version: os.release,
        },
        gpu: {
            controllers: gpu.controllers,
        }, // needs to know to send hardware info to the API to get capabilities back,
        cpu: {
            model: `${cpu.vendor}/${cpu.brand}`, // maybe use this to populate a branding photo for the brand of the CPU?
            cores: cpu.cores, // needed for calculating capabilities
            speed: cpu.speed, // needed for calculating capabilities
        }
    };
}

electron.app.on('ready', async () => {
    let tmp: any = null;

    electron.ipcMain.on('message', function(event, data){
        switch (data) {
            case 'redux_hydrate': event.sender.send('hydrate', tmp); break;
        }
    });

    await getSystemInformation().then((val) => {
        tmp = val;
    });

    win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        title: `${APP_NAME} v${APP_VERSION}${process.env.NODE_ENV !== 'production' ? ' [Development Mode]' : ''}`,
        webPreferences: {
            nodeIntegrationInWorker: true,
            preload: path.join(__dirname, `preload`)
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