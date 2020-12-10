import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';

function App() {
  return (
    <div className="App window">
      <div className="controls">
        <span class="icon icon-cancel"></span>
      </div>
      <div className="toolbar toolbar-header">
        <h1 className="title">Gemini Desktop</h1>
      </div>
    </div>
  );
}

export default App;
