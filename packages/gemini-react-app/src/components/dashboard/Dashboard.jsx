import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                Dashboard
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Dashboard);