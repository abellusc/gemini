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

export default connect(((state, ownProps) => {
    const adv = common.mapStateToProps(state, ownProps);

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
}), common.mapDispatchToProps)(Deploy);