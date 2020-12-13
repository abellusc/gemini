import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import { SystemInformation } from './sysinfo/SystemInformation';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard feature">
                <SystemInformation state={this.props.state.sys} />
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Dashboard);