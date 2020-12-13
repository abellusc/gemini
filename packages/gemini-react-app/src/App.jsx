import React from 'react';
import './App.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes as iconClose, faWindowMinimize as iconMinimize, faWindowMaximize as iconMaximize } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReduxUtils from '@solsticeproject/gemini-redux-utils';

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
              <div className={classNames({
                'tab-item': true,
                'active': (this.props.state.app.feature_tab === featureName.toLowerCase()),
              })} onClick={() => this.handleTabClick(featureName)}>
                {featureName}
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    state: {
      ...state,
    },
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    ...ownProps,
    dispatch,
    actions: {
      ...ReduxUtils.actions
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
