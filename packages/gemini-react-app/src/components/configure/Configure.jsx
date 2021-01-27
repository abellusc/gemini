import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class Configure extends React.Component {
    render() {
        return (
            <div className="Configure">
                Configure
            </div>
        )
    }
}

export default connect((currentState, ownProps) => {
    const adv = require('../../common').mapStateToProps(currentState, ownProps);

    const {
        state: {
            app
        },
        self,
    } = adv;

    return {
        state: {
            app
        },
        self
    };
}, common.mapDispatchToProps)(Configure);