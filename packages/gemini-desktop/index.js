import * as electron from 'electron';
import * as geminiApp from './app/src';

const browser = new electron.BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    title: 'Gemini',
});

document.addEventListener('DOMContentLoaded', () => {
    geminiApp.render();
});