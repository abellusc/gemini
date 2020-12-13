import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import ReduxUtils from '@solsticeproject/gemini-redux-utils';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
const { ipcRenderer } = window;

console.log(window.ipcRenderer);

const store = ReduxUtils.storage.getConfiguredStore();

if (!ipcRenderer) { // TODO: this is where the web view would go, because it has to be a separate component set that uses remote calls to an agent
  ReactDOM.render(
    <React.StrictMode>
      <div>
        This app must be run in an electron context.
      </div>
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  ipcRenderer.once('redux_hydrate', (sysInfo) => {
    store.dispatch(ReduxUtils.actions.hydrateFromSystem(sysInfo));
  })

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
