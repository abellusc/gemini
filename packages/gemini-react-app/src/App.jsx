import React from 'react';
import './App.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes as iconClose, faWindowMinimize as iconMinimize, faWindowMaximize as iconMaximize } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';

import classNames from 'classnames';

import ReduxUtils from '@solsticeproject/gemini-redux-utils';

function App(props) {
  console.log(props.actions)
  var userAgent = navigator.userAgent.toLowerCase();
  if (!userAgent.includes('electron')) {
    // Electron not found
    return <div>You must run this application in an electron context.</div>;
  }
  return (
    <div className="App window">
      <div className="tab-group">
        {props.state.app.features_available.map(featureName => (
          <>
            <div className={classNames({
              'tab-item': true,
              'active': props.state.app.feature_tab === featureName.toLowerCase(),
            })} onClick={() => props.dispatch(props.actions.setFeatureTab(featureName.toLowerCase()))}>
              {featureName}
            </div>
          </>
        ))}
      </div>
    </div>
  );
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
