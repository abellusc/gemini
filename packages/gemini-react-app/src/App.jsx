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

class App extends React.Component {
  constructor() {
    super();
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(featureName) {
    this.props.dispatch(this.props.actions.setFeatureTab(featureName.toLowerCase()))
    this.setState({});
  }
  render() {
    console.log(this.props.actions)
    var userAgent = navigator.userAgent.toLowerCase();
    if (!userAgent.includes('electron')) {
      // Electron not found
      return <div>You must run this application in an electron context.</div>;
    }
    return (
      <div className="App window">
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
      </div>
    );
  }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(App);
