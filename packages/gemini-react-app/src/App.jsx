import React from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes as iconClose, faWindowMinimize as iconMinimize, faWindowMaximize as iconMaximize } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App window">
      <div className="toolbar toolbar-header">
        <div className="toolbar-actions">
          <div className="btn-group">
            <button className="btn btn-default">
              <i className="icon icon-home"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
