import React from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes as iconClose, faWindowMinimize as iconMinimize, faWindowMaximize as iconMaximize } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App window">
      <div className="controls">
        <FontAwesomeIcon className="ctrlIcon" icon={iconClose} />
        <FontAwesomeIcon className="ctrlIcon" icon={iconMinimize} />
        <FontAwesomeIcon className="ctrlIcon" icon={iconMaximize} />
      </div>
      <div className="toolbar toolbar-header">
        <h1 className="title">Gemini Desktop</h1>
      </div>
    </div>
  );
}

export default App;
