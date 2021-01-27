import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class Deploy extends React.Component {
    render() {
        return (
            <div className="Deploy">
                Deploy
            </div>
        )
    }
}

export default connect((currentState, ownProps) => {
    const adv = require('../../common').mapStateToProps(currentState, ownProps);

    const {
        state: {
            app: {
                common,
                sys_info
            },
            sys,
        },
        self,
    } = adv;

    return {
        state,
        self
    };
}, common.mapDispatchToProps)(Deploy);