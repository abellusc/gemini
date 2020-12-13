import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';

class Configure extends React.Component {
    render() {
        return (
            <div className="Configure">
                Configure
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Configure);