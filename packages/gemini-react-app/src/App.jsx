import React from 'react';
import './App.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes as iconClose, faWindowMinimize as iconMinimize, faWindowMaximize as iconMaximize } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Switch, Redirect, Route, Link } from 'react-router-dom';
import * as common from './common';
import Dashboard from './components/dashboard/Dashboard';
import Configure from './components/configure/Configure';
import Deploy from './components/deploy/Deploy';
import Optimize from './components/optimize/Optimize';
import Validate from './components/validate/Validate';
import Loading from './components/loading/Loading';
import SplashScreen from './components/splashscreen/SplashScreen';
const { ipcRenderer } = window;

class App extends React.Component {
  constructor() {
    super();
    this.handleTabClick = this.handleTabClick.bind(this);
    
    this.state = {
      initTime: Date.now(),
      displayApp: false,
    }
  }

  componentDidMount() {
    console.log('props');
    console.log(this.props);
    setTimeout(() => this.hydrate({...this.props}), 10000);
  }

  hydrate(props) {
    // when the value changes (when the ipc channel sends this data from electron context)
    ipcRenderer.on('hydrate', (event, response) => {
      if (Object.keys(response).length > 0) {
        props.dispatch(props.actions.hydrateFromSystem(response));
      }
    });
    ipcRenderer.send('message', 'redux_hydrate');
  }

  displayApp() {
    this.setState({
      displayApp: true,
    });
  }

  handleTabClick(featureName) {
    this.props.dispatch(this.props.actions.setFeatureTab(featureName.toLowerCase()))
    this.setState({});
  }
  render() {
    console.log(this.props.state)
    var userAgent = navigator.userAgent.toLowerCase();
    if (!userAgent.includes('electron')) {
      // Electron not found
      return <div>You must run this application in an electron context.</div>;
    }
    return (
      <div className="App window">
        {
          this.props.state._loaded ? (
            <>
              { this.state.displayApp ? <SplashScreen opacity={this.state.displayApp ? 0.0 : 1.0} /> : '' }
              <div className="tab-group">
                {this.props.state.app.features_available.map(featureName => (
                  <>
                    <Link to={`/${featureName.toLowerCase()}`} className={classNames({
                      'tab-item': true,
                      'active': (this.props.state.app.feature_tab === featureName.toLowerCase()),
                    })} onClick={() => this.handleTabClick(featureName)}>
                      {featureName}
                    </Link>
                  </>
                ))}
              </div>
              <div className="content">
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/configure" component={Configure} />
                  <Route path="/deploy" component={Deploy} />
                  <Route path="/optimize" component={Optimize} />
                  <Route path="/validate" component={Validate} />
                  <Redirect from="/**" to="/dashboard" />
                </Switch>
              </div>
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
      </div>
    );
  }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(App);
