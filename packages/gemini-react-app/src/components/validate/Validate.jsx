import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class Validate extends React.Component {
    render() {
        return (
            <div className="Validate">
                Validate
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
        state,
        self
    };
}, common.mapDispatchToProps)(Validate);