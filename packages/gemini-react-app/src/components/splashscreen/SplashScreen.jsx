import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class SplashScreen extends React.Component {
    render() {
        return (
            <div className="Splash" style={{opacity: this.props.opacity}}>
                gemini
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(SplashScreen);