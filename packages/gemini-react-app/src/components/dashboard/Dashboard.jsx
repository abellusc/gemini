import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Dashboard);