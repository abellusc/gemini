import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeComponent from './component/home/HomeComponent';

function App() {
  return (
    <div className="App">
      { /* Menu Bar */ }


      { /* Content - Router Outlet */ }
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Redirect path="**" to="/" />
      </Switch>

      { /* Status Bar? */ }


      { /* Copyright Mark */ }
    </div>
  );
}

export default App;
